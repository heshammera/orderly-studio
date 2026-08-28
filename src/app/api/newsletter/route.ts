import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid email required." },
        { status: 400 }
      );
    }

    // Save as a special lead with type NEWSLETTER
    await db.lead.create({
      data: {
        name: "Newsletter Subscriber",
        email,
        company: "",
        country: "",
        projectType: JSON.stringify(["NEWSLETTER"]),
        services: JSON.stringify(["STUDIO_DISPATCH"]),
        description: "Subscribed via Footer newsletter form.",
        status: "NEWSLETTER",
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/leads");

    return NextResponse.json({ success: true });
  } catch (err: any) {
    // Ignore duplicate email errors gracefully
    if (err?.code === "P2002") {
      return NextResponse.json({ success: true, note: "Already subscribed." });
    }
    console.error("Newsletter subscription error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to subscribe." },
      { status: 500 }
    );
  }
}
