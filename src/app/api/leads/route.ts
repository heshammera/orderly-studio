import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sendLeadAlert } from "@/lib/notifications";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      company,
      website,
      message,
      country,
      projectType,
      services,
      budget,
      timeline,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    // 1. Persist to PostgreSQL database
    let savedLeadId: string | null = null;
    try {
      const created = await db.lead.create({
        data: {
          name,
          email,
          company: company || "",
          country: country || (website ? `URL: ${website}` : ""),
          projectType: JSON.stringify(projectType || ["DISCOVERY_WIZARD"]),
          services: JSON.stringify(services || ["FULL_STUDIO_BRIEF"]),
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

    // 2. Dispatch instant email notification to hesham.mera@gmail.com + webhooks
    await sendLeadAlert({
      name,
      email,
      company,
      website,
      country,
      message,
      projectType,
      services,
      budget,
      timeline,
    });

    return NextResponse.json({
      success: true,
      message: "Lead recorded and alert dispatched successfully",
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
