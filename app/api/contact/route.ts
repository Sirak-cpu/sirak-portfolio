import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, message, social, email } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const formLink = process.env.GOOGLE_FORM_LINK?.trim();
    const fieldIdName = process.env.GOOGLE_FORM_FIELD_ID_NAME;
    const fieldIdEmail = process.env.GOOGLE_FORM_FIELD_ID_EMAIL;
    const fieldIdMessage = process.env.GOOGLE_FORM_FIELD_ID_MESSAGE;
    const fieldIdSocial = process.env.GOOGLE_FORM_FIELD_ID_SOCIAL;

    if (formLink && fieldIdName && fieldIdEmail && fieldIdMessage) {
      try {
        const queryParams = new URLSearchParams({
          [fieldIdName]: name,
          [fieldIdEmail]: email,
          [fieldIdMessage]: message,
          ...(fieldIdSocial && social ? { [fieldIdSocial]: social } : {}),
        });

        await fetch(`${formLink}/formResponse?${queryParams.toString()}`);
      } catch (err) {
        console.warn("Google Form webhook error:", err);
      }
    } else {
      console.log("Contact form message received:", { name, email, message, social });
    }

    return NextResponse.json({
      success: true,
      message: "Message received successfully!",
      directEmail: siteConfig.email,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to submit message." },
      { status: 500 }
    );
  }
}
