"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Shield, Loader2, ArrowRight } from "lucide-react";
import { Symbol } from "@/components/brand/Symbol";
import { loginAdmin } from "@/actions/adminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const res = await loginAdmin(formData);

    setLoading(false);
    if (res.success) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(res.error || "خطأ في تسجيل الدخول.");
    }
  };

  return (
    <main className="min-h-screen bg-obsidian text-white flex flex-col items-center justify-center p-6 select-none relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-engineering-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl bg-soft-black border border-white/15 shadow-2xl">
        <div className="flex flex-col items-center text-center mb-8">
          <Symbol size={48} variant="engineering" animated={true} className="mb-4" />
          <span className="text-xs font-mono text-engineering-blue tracking-widest uppercase font-bold mb-1">
            CONTROL ACCESS
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
            ORDERLY ADMIN
          </h1>
          <p className="text-neutral-cool text-xs mt-2">
            لوحة تحكم إدارة المشاريع وطلبات العملاء
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-mono text-center mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-neutral-cool block mb-2">
              اسم المستخدم (Username)
            </label>
            <div className="relative">
              <input
                type="text"
                name="username"
                required
                defaultValue="admin"
                placeholder="admin"
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-engineering-blue font-mono"
              />
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-neutral-cool block mb-2">
              كلمة المرور (Password)
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-engineering-blue font-mono"
              />
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-engineering-blue text-white font-bold text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-xl disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  <span>تسجيل الدخول // AUTHENTICATE</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-[11px] font-mono text-neutral-cool/60">
            Default: <code className="text-white">admin</code> / <code className="text-white">OrderlyAdmin2026!</code>
          </p>
        </div>
      </div>
    </main>
  );
}