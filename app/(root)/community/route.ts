import { NextResponse } from "next/server";

export async function GET() {
  const discordLink = process.env.NEXT_PUBLIC_DISCORD_LINK || "https://discord.com";
  return NextResponse.redirect(discordLink);
}