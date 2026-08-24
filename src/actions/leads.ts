"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface LeadSubmissionInput {
  name: string;
  email: string;
  company?: string;
  country?: string;
  projectType: string[];
  services: string[];
  successGoal?: string;
  description?: string;
}

export async function submitProjectBrief(data: LeadSubmissionInput) {
  try {
    if (!data.name || !data.email) {
      return { success: false, error: "Name and email are required." };
    }

    const newLead = await db.lead.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company || "",
        country: data.country || "",
        projectType: JSON.stringify(data.projectType),
        services: JSON.stringify(data.services),
        successGoal: data.successGoal || "",
        description: data.description || "",
        status: "NEW",
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/leads");
    return { success: true, leadId: newLead.id };
  } catch (err) {
    console.error("Error saving lead brief:", err);
    return { success: false, error: "Failed to persist project brief." };
  }
}

export async function updateLeadStatus(leadId: string, newStatus: string) {
  try {
    await db.lead.update({
      where: { id: leadId },
      data: { status: newStatus },
    });
    revalidatePath("/admin");
    revalidatePath("/admin/leads");
    return { success: true };
  } catch (err) {
    console.error("Error updating lead status:", err);
    return { success: false, error: "Failed to update status." };
  }
}

export async function deleteLead(leadId: string) {
  try {
    await db.lead.delete({
      where: { id: leadId },
    });
    revalidatePath("/admin");
    revalidatePath("/admin/leads");
    return { success: true };
  } catch (err) {
    console.error("Error deleting lead:", err);
    return { success: false, error: "Failed to delete lead." };
  }
}