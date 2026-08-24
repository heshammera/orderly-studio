"use client";

import React, { useState } from "react";
import { 
  Users, Mail, MapPin, Building, Calendar, Trash2, CheckCircle2, 
  Clock, MessageSquare, Award, Archive, Search, Filter, AlertTriangle
} from "lucide-react";
import { updateLeadStatus, deleteLead } from "@/actions/leads";

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  company: string | null;
  country: string | null;
  projectType: string;
  services: string;
  successGoal: string | null;
  description: string | null;
  status: string;
  createdAt: Date;
}

interface LeadsManagerProps {
  initialLeads: LeadItem[];
}

export const LeadsManager: React.FC<LeadsManagerProps> = ({ initialLeads }) => {
  const [leads, setLeads] = useState<LeadItem[]>(initialLeads);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const statuses = [
    { id: "NEW", label: "جديد // NEW", color: "bg-blue-500/15 text-blue-400 border-blue-500/30", cardBorder: "hover:border-blue-500/40" },
    { id: "REVIEWING", label: "قيد المراجعة // REVIEWING", color: "bg-amber-500/15 text-amber-400 border-amber-500/30", cardBorder: "hover:border-amber-500/40" },
    { id: "CONTACTED", label: "تم التواصل // CONTACTED", color: "bg-purple-500/15 text-purple-400 border-purple-500/30", cardBorder: "hover:border-purple-500/40" },
    { id: "QUALIFIED", label: "مؤهل // QUALIFIED", color: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30", cardBorder: "hover:border-cyan-500/40" },
    { id: "CONVERTED", label: "تم التعاقد // CONVERTED", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", cardBorder: "hover:border-emerald-500/40" },
    { id: "ARCHIVED", label: "مؤرشف // ARCHIVED", color: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30", cardBorder: "hover:border-zinc-500/40" },
  ];

  const getStatusStyle = (status: string) => {
    return statuses.find((s) => s.id === status) || statuses[0];
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    setUpdatingId(leadId);
    const res = await updateLeadStatus(leadId, newStatus);
    if (res.success) {
      setLeads((prev) =>
        prev.map((item) => (item.id === leadId ? { ...item, status: newStatus } : item))
      );
    }
    setUpdatingId(null);
  };

  const handleDelete = async (leadId: string) => {
    setUpdatingId(leadId);
    const res = await deleteLead(leadId);
    if (res.success) {
      setLeads((prev) => prev.filter((item) => item.id !== leadId));
      setDeleteConfirmId(null);
    }
    setUpdatingId(null);
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesFilter = activeFilter === "ALL" || lead.status === activeFilter;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="بحث بالاسم، البريد، أو الشركة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#16161C] border border-white/10 text-white text-xs placeholder:text-neutral-cool focus:outline-none focus:border-engineering-blue font-mono"
          />
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveFilter("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all ${
              activeFilter === "ALL"
                ? "bg-white text-obsidian font-bold shadow-md"
                : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            الكل ({leads.length})
          </button>
          {statuses.map((st) => {
            const count = leads.filter((l) => l.status === st.id).length;
            return (
              <button
                key={st.id}
                onClick={() => setActiveFilter(st.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all border ${
                  activeFilter === st.id
                    ? `${st.color} font-bold shadow-md`
                    : "bg-white/5 border-transparent text-white/60 hover:bg-white/10"
                }`}
              >
                {st.id} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Leads List */}
      {filteredLeads.length === 0 ? (
        <div className="p-16 rounded-3xl bg-[#16161C] border border-white/5 text-center text-neutral-cool font-mono text-xs">
          لا توجد طلبات مطابقة للفلتر أو البحث المحدد.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredLeads.map((lead) => {
            const statusConfig = getStatusStyle(lead.status);
            const projectTypes = lead.projectType ? JSON.parse(lead.projectType) : [];
            const services = lead.services ? JSON.parse(lead.services) : [];

            return (
              <div
                key={lead.id}
                className={`p-8 rounded-3xl bg-[#16161C] border border-white/10 ${statusConfig.cardBorder} transition-all duration-300 shadow-xl space-y-6 relative overflow-hidden`}
              >
                {/* Status Indicator Bar at Top */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${statusConfig.color.split(" ")[0]}`} />

                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-6 gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-2xl font-display font-bold text-white">{lead.name}</h2>
                      {/* Dynamic Color Status Badge */}
                      <span
                        className={`px-3.5 py-1 rounded-full border text-xs font-mono font-bold tracking-wider uppercase ${statusConfig.color}`}
                      >
                        {statusConfig.label}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-cool mt-2">
                      <span className="flex items-center gap-1.5 text-white/80">
                        <Mail size={13} className="text-engineering-blue" /> {lead.email}
                      </span>
                      {lead.company && (
                        <span className="flex items-center gap-1.5">
                          <Building size={13} className="text-creative-coral" /> {lead.company}
                        </span>
                      )}
                      {lead.country && (
                        <span className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-engineering-violet" /> {lead.country}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-white/40 flex items-center gap-1.5">
                      <Calendar size={13} />
                      {new Date(lead.createdAt).toLocaleString()}
                    </span>

                    {/* Delete Trigger */}
                    <button
                      onClick={() => setDeleteConfirmId(lead.id)}
                      className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                      title="حذف الطلب نهائياً"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Scope & Disciplines */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#0E0E12] border border-white/5">
                    <span className="text-[10px] font-mono text-engineering-blue uppercase tracking-wider block mb-2 font-bold">
                      PROJECT SCOPE // نوع المشروع
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {projectTypes.map((t: string, i: number) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 text-xs text-white">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0E0E12] border border-white/5">
                    <span className="text-[10px] font-mono text-creative-coral uppercase tracking-wider block mb-2 font-bold">
                      SERVICES // الخدمات المطلوبة
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {services.map((s: string, i: number) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 text-xs text-white">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Goal & Description */}
                {(lead.successGoal || lead.description) && (
                  <div className="space-y-3">
                    {lead.successGoal && (
                      <div className="p-4 rounded-2xl bg-[#0E0E12] border border-white/5">
                        <span className="text-[10px] font-mono text-engineering-violet uppercase tracking-wider block mb-1 font-bold">
                          SUCCESS GOAL // هدف النجاح
                        </span>
                        <p className="text-sm text-white/90 leading-relaxed">{lead.successGoal}</p>
                      </div>
                    )}
                    {lead.description && (
                      <div className="p-4 rounded-2xl bg-[#0E0E12] border border-white/5">
                        <span className="text-[10px] font-mono text-neutral-cool uppercase tracking-wider block mb-1 font-bold">
                          THE IDEA // تفاصيل الفكرة
                        </span>
                        <p className="text-sm text-white/90 leading-relaxed">{lead.description}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Status Control Actions (Change status buttons) */}
                <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs font-mono text-white/50">تغيير حالة الطلب اللحظية:</span>
                  <div className="flex flex-wrap items-center gap-2">
                    {statuses.map((st) => (
                      <button
                        key={st.id}
                        disabled={updatingId === lead.id || lead.status === st.id}
                        onClick={() => handleStatusChange(lead.id, st.id)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-mono tracking-wider uppercase transition-all border ${
                          lead.status === st.id
                            ? `${st.color} font-bold shadow-md scale-105 pointer-events-none`
                            : "bg-white/[0.03] border-white/10 text-white/60 hover:text-white hover:bg-white/[0.08]"
                        } disabled:opacity-50`}
                      >
                        {st.id}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#16161C] border border-rose-500/30 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-500/15 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-xl font-display font-bold text-white">هل أنت متأكد من حذف هذا الطلب؟</h3>
            <p className="text-neutral-cool text-xs leading-relaxed font-mono">
              سيتم حذف بيانات العميل والموجز نهائياً من قاعدة البيانات ولا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-mono font-bold uppercase transition-colors"
              >
                نعم، احذف نهائياً
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};