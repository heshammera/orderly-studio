import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/actions/adminAuth";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { FolderKanban, Users, FileText, Shield, Activity, ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboardPage() {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  let leadsCount = 0;
  let recentLeads: any[] = [];

  try {
    leadsCount = await db.lead.count();
    recentLeads = await db.lead.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.warn("DB connection warning in admin dashboard:", err);
  }

  return (
    <main className="min-h-screen bg-[#0E0E12] text-white p-6 sm:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-12 border-b border-white/10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-engineering-blue/15 border border-engineering-blue/30 text-engineering-blue text-xs font-mono mb-2">
              <Shield size={13} />
              <span>ORDERLY CONTROL CENTER // SECURE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black">Studio Admin Dashboard</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono hover:bg-white/10 transition-colors"
            >
              ← Public Website
            </Link>
            <Link
              href="/admin/leads"
              className="px-5 py-2 rounded-xl bg-engineering-blue text-white text-xs font-bold font-mono tracking-wider uppercase hover:bg-blue-600 transition-colors"
            >
              Manage Leads ({leadsCount})
            </Link>
            <AdminLogoutButton />
          </div>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-12">
          <Link
            href="/admin/leads"
            className="p-6 rounded-2xl bg-[#16161C] border border-white/5 hover:border-engineering-blue/40 transition-all shadow-xl block group"
          >
            <div className="flex items-center justify-between text-neutral-cool text-xs font-mono mb-4">
              <span>ACTIVE LEADS</span>
              <Users size={18} className="text-engineering-blue group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-4xl font-display font-black text-white">{leadsCount}</span>
              <span className="text-xs font-mono text-engineering-blue">View All →</span>
            </div>
          </Link>

          <div className="p-6 rounded-2xl bg-[#16161C] border border-white/5 shadow-xl">
            <div className="flex items-center justify-between text-neutral-cool text-xs font-mono mb-4">
              <span>PROJECTS</span>
              <FolderKanban size={18} className="text-creative-coral" />
            </div>
            <span className="text-4xl font-display font-black text-white">4</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#16161C] border border-white/5 shadow-xl">
            <div className="flex items-center justify-between text-neutral-cool text-xs font-mono mb-4">
              <span>CASE STUDIES</span>
              <FileText size={18} className="text-engineering-violet" />
            </div>
            <span className="text-4xl font-display font-black text-white">4</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#16161C] border border-white/5 shadow-xl">
            <div className="flex items-center justify-between text-neutral-cool text-xs font-mono mb-4">
              <span>UPTIME SLA</span>
              <Activity size={18} className="text-emerald-400" />
            </div>
            <span className="text-4xl font-display font-black text-emerald-400">99.98%</span>
          </div>
        </div>

        {/* Recent Inquiries / Leads */}
        <div className="p-8 rounded-3xl bg-[#16161C] border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
            <h2 className="text-xl font-display font-bold">Recent Project Briefs</h2>
            <Link href="/admin/leads" className="text-xs font-mono text-engineering-blue hover:underline">
              Open Leads Manager →
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <div className="text-center py-12 text-neutral-cool font-mono text-xs">
              No project briefs submitted yet. They will appear here once received.
            </div>
          ) : (
            <div className="space-y-3">
              {recentLeads.map((lead: any) => (
                <div
                  key={lead.id}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
                >
                  <div>
                    <span className="text-sm font-bold block">{lead.name}</span>
                    <span className="text-xs text-neutral-cool font-mono">{lead.email} • {lead.company || "Direct"}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}