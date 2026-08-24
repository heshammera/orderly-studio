"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { logoutAdmin } from "@/actions/adminAuth";

export const AdminLogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-rose-500/40 hover:bg-rose-500/10 text-neutral-cool hover:text-rose-400 text-xs font-mono transition-colors"
      title="Logout"
    >
      <LogOut size={14} />
      <span>تسجيل الخروج // LOGOUT</span>
    </button>
  );
};