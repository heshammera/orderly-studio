import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, website, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    const leadPayload = {
      timestamp: new Date().toISOString(),
      name,
      email,
      company: company || "N/A",
      website: website || "N/A",
      message: message || "N/A",
    };

    console.log("=== [NEW ORDERLY LEAD] ===", leadPayload);

    // Optional: Webhook alert (Discord / Slack / Telegram) if env var exists
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `🚀 **New ORDERLY Project Lead Received!**\n**Name:** ${name}\n**Email:** ${email}\n**Company:** ${company || "N/A"}\n**Website:** ${website || "N/A"}\n\n**Details:**\n\`\`\`\n${message || "No brief details provided"}\n\`\`\``,
          }),
        });
      } catch (webhookErr) {
        console.error("Webhook notification failed:", webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Lead recorded successfully",
      data: { name, email, company },
    });
  } catch (error) {
    console.error("Failed to process lead:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
