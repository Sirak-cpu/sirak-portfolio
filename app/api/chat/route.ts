import { NextRequest, NextResponse } from "next/server";
import { AI_PERSONA, SIRAK_SYSTEM_PROMPT } from "@/config/ai-persona";

const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

const FALLBACK_MODELS = [
  "openrouter/free",
  "minimax/minimax-m2.7:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "google/gemma-4-31b-it:free",
  "liquid/lfm-2.5-2.6b:free",
  "z-ai/glm-5.2:free",
];

async function callOpenRouter(
  messages: Array<{ role: string; content: string }>,
  model: string,
  apiKey: string
) {
  return await fetch(OPENROUTER_ENDPOINT, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "https://sirakembibel.com",
      "X-Title": "Sirak Embibel Portfolio AI Twin",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SIRAK_SYSTEM_PROMPT },
        ...messages,
      ],
      stream: true,
      temperature: 0.6,
      max_tokens: 1200,
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request. 'messages' array is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY?.trim();
    const primaryModel = process.env.OPENROUTER_MODEL?.trim() || AI_PERSONA.defaultModel;

    // If API key is not configured, provide an intelligent fallback message
    if (!apiKey) {
      const fallbackStream = new ReadableStream({
        start(controller) {
          const encoder = new TextEncoder();
          const fallbackText =
            "👋 Hi! I'm Sirak Embibel's AI Digital Twin — currently offline for maintenance.\n\n" +
            "In the meantime, feel free to explore Sirak's work:\n" +
            "- 🚀 [View Projects](/projects) — RAG pipelines, multi-agent SaaS, healthcare automation\n" +
            "- 📄 [Read Resume](/resume) — 10+ years of public health leadership + applied AI engineering\n" +
            "- 📬 Reach out directly: **sirakbayet@gmail.com** or [Contact page](/contact)";
          
          controller.enqueue(encoder.encode(fallbackText));
          controller.close();
        },
      });

      return new Response(fallbackStream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Transfer-Encoding": "chunked",
        },
      });
    }

    // Attempt primary model, then fallback models if rate-limited
    const modelsToTry = [primaryModel, ...FALLBACK_MODELS.filter((m) => m !== primaryModel)];
    let response: Response | null = null;
    let lastErrorText = "";

    for (const model of modelsToTry) {
      try {
        const res = await callOpenRouter(messages, model, apiKey);
        if (res.ok && res.body) {
          response = res;
          break;
        } else {
          lastErrorText = await res.text();
          console.warn(`Model ${model} returned status ${res.status}:`, lastErrorText);
        }
      } catch (err: any) {
        lastErrorText = err?.message || "Network error";
        console.warn(`Failed calling model ${model}:`, lastErrorText);
      }
    }

    if (!response || !response.body) {
      return NextResponse.json(
        {
          error: "All OpenRouter models are currently busy or rate-limited. Please try again in a few moments.",
          details: lastErrorText,
        },
        { status: 502 }
      );
    }

    // Transform OpenRouter SSE stream into plain text stream for the client
    const textEncoder = new TextEncoder();
    const textDecoder = new TextDecoder();
    const originalBody = response.body;

    const stream = new ReadableStream({
      async start(controller) {
        const reader = originalBody.getReader();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += textDecoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || trimmed.startsWith(":")) continue;

              if (trimmed === "data: [DONE]") {
                controller.close();
                return;
              }

              if (trimmed.startsWith("data: ")) {
                try {
                  const data = JSON.parse(trimmed.slice(6));
                  const delta =
                    data.choices?.[0]?.delta?.content ||
                    data.choices?.[0]?.delta?.text ||
                    data.choices?.[0]?.text ||
                    "";
                  if (delta) {
                    controller.enqueue(textEncoder.encode(delta));
                  }
                } catch {
                  // Partial JSON or unparseable line, ignore
                }
              }
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json(
      { error: "Internal server error occurred.", details: error?.message },
      { status: 500 }
    );
  }
}
