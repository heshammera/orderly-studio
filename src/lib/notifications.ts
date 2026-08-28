interface LeadNotificationPayload {
  name: string;
  email: string;
  company?: string;
  country?: string;
  website?: string;
  message?: string;
  projectType?: string[];
  services?: string[];
  budget?: string;
  timeline?: string;
}

export async function sendLeadAlert(payload: LeadNotificationPayload) {
  const {
    name,
    email,
    company,
    country,
    website,
    message,
    projectType,
    services,
    budget,
    timeline,
  } = payload;

  const targetEmail = "hesham.mera@gmail.com";
  const resendApiKey = process.env.RESEND_API_KEY;

  // 1. Resend Email Dispatch
  if (resendApiKey) {
    try {
      const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #08080C; color: #ffffff; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #0F1018; border: 1px solid #222538; border-radius: 16px; padding: 32px; }
    .badge { display: inline-block; padding: 4px 12px; background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); color: #34D399; font-size: 11px; font-weight: bold; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; }
    h1 { color: #ffffff; font-size: 24px; margin: 16px 0 8px 0; }
    .lead-info { background: #161826; border-radius: 12px; padding: 20px; margin: 24px 0; border: 1px solid rgba(255,255,255,0.05); }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13px; }
    .row:last-child { border-bottom: none; }
    .label { color: #8E92B2; font-weight: 500; }
    .value { color: #ffffff; font-weight: 600; text-align: right; }
    .brief-box { background: #12131F; border-left: 3px solid #34D399; padding: 16px; border-radius: 0 8px 8px 0; margin: 20px 0; font-size: 14px; line-height: 1.6; color: #D1D5DB; white-space: pre-wrap; }
    .btn { display: inline-block; padding: 14px 28px; background: #ffffff; color: #08080C; font-size: 13px; font-weight: bold; text-decoration: none; border-radius: 30px; text-transform: uppercase; letter-spacing: 1px; margin-top: 16px; }
    .footer { text-align: center; font-size: 11px; color: #555A7B; margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <span class="badge">🚀 New Inbound Brief Received</span>
    <h1>${name} submitted a project inquiry</h1>
    <p style="color: #8E92B2; font-size: 14px; margin-bottom: 0;">An active lead just arrived through the ORDERLY Studio platform.</p>

    <div class="lead-info">
      <div class="row"><span class="label">Full Name:</span><span class="value">${name}</span></div>
      <div class="row"><span class="label">Email Address:</span><span class="value"><a href="mailto:${email}" style="color: #38BDF8; text-decoration: none;">${email}</a></span></div>
      <div class="row"><span class="label">Company / Brand:</span><span class="value">${company || "N/A"}</span></div>
      <div class="row"><span class="label">Location / Country:</span><span class="value">${country || "N/A"}</span></div>
      ${website ? `<div class="row"><span class="label">Website:</span><span class="value">${website}</span></div>` : ""}
      ${budget ? `<div class="row"><span class="label">Budget Range:</span><span class="value" style="color: #34D399;">${budget}</span></div>` : ""}
      ${timeline ? `<div class="row"><span class="label">Desired Timeline:</span><span class="value">${timeline}</span></div>` : ""}
      ${projectType && projectType.length ? `<div class="row"><span class="label">Project Type:</span><span class="value">${projectType.join(", ")}</span></div>` : ""}
    </div>

    <p style="color: #8E92B2; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">Client Brief & Message:</p>
    <div class="brief-box">${message || "No additional text provided"}</div>

    <center>
      <a href="mailto:${email}?subject=Re:%20ORDERLY%20Studio%20Project%20Discovery%20%E2%80%94%20${encodeURIComponent(name)}" class="btn">
        Reply to ${name} Directly &rarr;
      </a>
    </center>

    <div class="footer">
      ORDERLY Studio OS Notification Engine &bull; Target: ${targetEmail}
    </div>
  </div>
</body>
</html>
      `;

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "ORDERLY Studio <onboarding@resend.dev>",
          to: [targetEmail],
          reply_to: email,
          subject: `🚀 [ORDERLY Lead] New project from ${name} (${company || "Direct"})`,
          html: emailHtml,
        }),
      });
    } catch (resendErr) {
      console.warn("Resend email delivery failed:", resendErr);
    }
  }

  // 2. Discord / Slack / Telegram Webhook Dispatch
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🚀 **New ORDERLY Project Lead Received!**\n**Name:** ${name}\n**Email:** ${email}\n**Company:** ${company || "N/A"}\n**Country:** ${country || "N/A"}\n**Website:** ${website || "N/A"}\n**Budget:** ${budget || "N/A"}\n\n**Brief Details:**\n\`\`\`\n${message || "No brief details provided"}\n\`\`\``,
        }),
      });
    } catch (webhookErr) {
      console.warn("Webhook dispatch failed:", webhookErr);
    }
  }
}
