import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, website, message, country } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Persist to database
    let savedLeadId: string | null = null;
    try {
      const created = await db.lead.create({
        data: {
          name,
          email,
          company: company || "",
          country: country || (website ? `URL: ${website}` : ""),
          projectType: JSON.stringify(["DISCOVERY_WIZARD"]),
          services: JSON.stringify(["FULL_STUDIO_BRIEF"]),
          description: message || "",
          status: "NEW",
        },
      });
      savedLeadId = created.id;
      revalidatePath("/admin");
      revalidatePath("/admin/leads");
    } catch (dbErr) {
      console.warn("Could not write lead to DB directly, continuing:", dbErr);
    }

    // Webhook alert (Discord / Slack / Telegram) if env var exists
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
      leadId: savedLeadId,
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
