import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/actions/adminAuth";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import {
  FolderKanban,
  Users,
  FileText,
  Shield,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FlaskConical,
} from "lucide-react";
import { PROJECTS_LIST } from "@/data/projects";
import { DISCIPLINES } from "@/data/disciplines";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboardPage() {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  let totalLeadsCount = 0;
  let newLeadsCount = 0;
  let recentLeads: any[] = [];

  try {
    totalLeadsCount = await db.lead.count();
    newLeadsCount = await db.lead.count({
      where: { status: "NEW" },
    });
    recentLeads = await db.lead.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.warn("DB connection in admin dashboard:", err);
  }

  const liveProjectsCount = PROJECTS_LIST.length; // 4
  const disciplinesCount = Object.keys(DISCIPLINES).length; // 6
  const labsCount = 4; // LAB_001 to LAB_004

  return (
    <main className="min-h-screen bg-[#08080C] text-white p-6 sm:p-12 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-10 border-b border-white/10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-engineering-blue/15 border border-engineering-blue/30 text-engineering-blue text-xs font-mono mb-3 font-bold">
              <Shield size={13} />
              <span>لوحة التحكم الرئيسية والعمليات // ORDERLY OS CONTROL</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-white">
              مركز إدارة الاستوديو والمشاريع
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono hover:bg-white/10 transition-colors flex items-center gap-1.5"
            >
              <span>الموقع العام</span>
              <ArrowUpRight size={13} />
            </Link>
            <Link
              href="/admin/leads"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 text-black text-xs font-bold font-mono tracking-wider uppercase hover:bg-emerald-400 transition-all shadow-lg flex items-center gap-2"
            >
              <Users size={14} />
              <span>إدارة الطلبات ({totalLeadsCount})</span>
            </Link>
            <AdminLogoutButton />
          </div>
        </div>

        {/* Studio Real Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {/* Active Leads */}
          <Link
            href="/admin/leads"
            className="p-6 rounded-3xl bg-[#0F1018] border border-white/10 hover:border-emerald-500/40 transition-all shadow-xl block group"
          >
            <div className="flex items-center justify-between text-neutral-cool text-xs font-mono mb-3 font-bold">
              <span>طلبات المشاريع الواردة</span>
              <Users size={18} className="text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl sm:text-4xl font-display font-black text-emerald-400">
                {totalLeadsCount}
              </span>
              <span className="text-[11px] font-mono text-slate-400 group-hover:text-emerald-300">
                {newLeadsCount > 0 ? `${newLeadsCount} طلب جديد` : "عرض الكل ←"}
              </span>
            </div>
          </Link>

          {/* Live Projects */}
          <div className="p-6 rounded-3xl bg-[#0F1018] border border-white/10 shadow-xl">
            <div className="flex items-center justify-between text-neutral-cool text-xs font-mono mb-3 font-bold">
              <span>مشاريع الإنتاج الحية</span>
              <FolderKanban size={18} className="text-sky-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl sm:text-4xl font-display font-black text-white">
                {liveProjectsCount}
              </span>
              <span className="text-[11px] font-mono text-sky-400">منصات معتمدة</span>
            </div>
          </div>

          {/* Transactions Handled */}
          <div className="p-6 rounded-3xl bg-[#0F1018] border border-white/10 shadow-xl">
            <div className="flex items-center justify-between text-neutral-cool text-xs font-mono mb-3 font-bold">
              <span>حجم الصفقات المدارة</span>
              <TrendingUp size={18} className="text-amber-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-display font-black text-amber-400 leading-tight">
                1.8B+ ج.م
              </span>
              <span className="text-[11px] font-mono text-slate-400 mt-0.5">
                ≈ $37M USD (عبر المنصات)
              </span>
            </div>
          </div>

          {/* Uptime SLA */}
          <div className="p-6 rounded-3xl bg-[#0F1018] border border-white/10 shadow-xl">
            <div className="flex items-center justify-between text-neutral-cool text-xs font-mono mb-3 font-bold">
              <span>استمرارية السحابة SLA</span>
              <Activity size={18} className="text-purple-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl sm:text-4xl font-display font-black text-purple-400">
                99.98%
              </span>
              <span className="text-[11px] font-mono text-emerald-400">تشغيل مثالي</span>
            </div>
          </div>
        </div>

        {/* Secondary System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                <Cpu size={16} />
              </div>
              <div>
                <span className="text-xs font-bold block">التخصصات والخدمات</span>
                <span className="text-[11px] font-mono text-slate-400">{disciplinesCount} تخصصات مفعلة بالكامل</span>
              </div>
            </div>
            <Link href="/services" target="_blank" className="text-xs font-mono text-sky-400 hover:underline">
              استعراض
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <FlaskConical size={16} />
              </div>
              <div>
                <span className="text-xs font-bold block">أبحاث المختبر (LABS)</span>
                <span className="text-[11px] font-mono text-slate-400">{labsCount} مشاريع R&D نشطة</span>
              </div>
            </div>
            <Link href="/labs" target="_blank" className="text-xs font-mono text-purple-400 hover:underline">
              استعراض
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Clock size={16} />
              </div>
              <div>
                <span className="text-xs font-bold block">معدل الاستجابة للطلبات</span>
                <span className="text-[11px] font-mono text-slate-400">أقل من 24 ساعة للرد والمواءمة</span>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">نشط</span>
          </div>
        </div>

        {/* Live Client Platforms Folio Table */}
        <div className="p-8 rounded-3xl bg-[#0F1018] border border-white/10 shadow-2xl mb-10">
          <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
            <div>
              <h2 className="text-lg font-display font-bold text-white mb-1">
                المنصات ومشاريع الإنتاج المعتمدة (Portfolio Platforms)
              </h2>
              <p className="text-xs font-mono text-slate-400">
                قائمة المشاريع الحية الموثقة المعروضة للعملاء مع مؤشرات الأداء الحقيقية.
              </p>
            </div>
            <Link href="/work" target="_blank" className="text-xs font-mono text-sky-400 hover:underline">
              معرض الأعمال ←
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROJECTS_LIST.map((proj) => (
              <div
                key={proj.slug}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 font-bold">
                      {proj.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{proj.year}</span>
                  </div>
                  <h3 className="text-sm font-display font-bold text-white mb-1">
                    {proj.titleAr}
                  </h3>
                  <span className="text-xs font-mono text-slate-400 block mb-3">
                    {proj.clientAr} • {proj.locationAr}
                  </span>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">أبرز مؤشر:</span>
                  <span className="text-emerald-400 font-bold">
                    {proj.metrics[0]?.value} ({proj.metrics[0]?.labelAr})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries / Leads */}
        <div className="p-8 rounded-3xl bg-[#0F1018] border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
            <div>
              <h2 className="text-lg font-display font-bold text-white mb-1">
                أحدث طلبات وموجزات المشاريع المستلمة
              </h2>
              <p className="text-xs font-mono text-slate-400">
                الطلبات الواردة عبر معالج الاستكشاف الذكي أو استمارة طلب المشاريع.
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white hover:bg-white/10 transition-colors"
            >
              فتح مدير الطلبات الكامل ←
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <div className="text-center py-12 text-neutral-cool font-mono text-xs space-y-2">
              <p>لم يتم استلام أي طلبات جديدة حتى الآن.</p>
              <p className="text-slate-500 text-[11px]">
                بمجرد أن يملأ أي عميل نموذج الاستكشاف في الموقع ستظهر تفاصيله هنا فوراً.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentLeads.map((lead: any) => (
                <div
                  key={lead.id}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/15 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-white">{lead.name}</span>
                      {lead.company && (
                        <span className="text-xs font-mono text-slate-400">({lead.company})</span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 font-mono block">{lead.email}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500">
                      {new Date(lead.createdAt).toLocaleDateString("ar-SA")}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-3 py-1 rounded-full border font-bold ${
                        lead.status === "NEW"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : lead.status === "CONVERTED"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}
                    >
                      {lead.status === "NEW" ? "جديد" : lead.status === "CONVERTED" ? "تم التعاقد" : lead.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}