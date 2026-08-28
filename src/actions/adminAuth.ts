"use server";

import { cookies } from "next/headers";

const ADMIN_USER = "admin";
const ADMIN_PASS = "OrderlyAdmin2026!";
const SESSION_COOKIE = "orderly_admin_session";

export async function loginAdmin(formData: FormData) {
  try {
    const username = formData.get("username")?.toString().trim();
    const password = formData.get("password")?.toString();

    if (
      (username === ADMIN_USER || username === "admin@orderly.studio" || username === "hesham") &&
      password === ADMIN_PASS
    ) {
      cookies().set(SESSION_COOKIE, "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
      return { success: true };
    }

    return { success: false, error: "اسم المستخدم أو كلمة المرور غير صحيحة." };
  } catch (e: any) {
    return { success: false, error: e?.message || "حدث خطأ أثناء تسجيل الدخول." };
  }
}

export async function logoutAdmin() {
  try {
    cookies().delete(SESSION_COOKIE);
    return { success: true };
  } catch (_) {
    return { success: true };
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get(SESSION_COOKIE);
    return session?.value === "authenticated";
  } catch (e) {
    return false;
  }
}