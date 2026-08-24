import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/actions/adminAuth";
import { LeadsManager } from "@/components/admin/LeadsManager";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { ArrowLeft } from "lucide-react";

export const revalidate = 0;

export default async function AdminLeadsPage() {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  const leads = await db.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-[#0E0E12] text-white p-6 sm:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-cool hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>BACK TO DASHBOARD</span>
          </Link>
          <AdminLogoutButton />
        </div>

        <div className="pb-8 mb-10 border-b border-white/10">
          <h1 className="text-3xl sm:text-4xl font-display font-black mb-1">
            إدارة طلبات وموجز المشاريع (Leads Management)
          </h1>
          <p className="text-neutral-cool text-xs font-mono">
            تحكم كامل في حالات الطلبات، تغيير الألوان، البحث، الفلترة، والحذف اللحظي.
          </p>
        </div>

        <LeadsManager initialLeads={leads} />
      </div>
    </main>
  );
}