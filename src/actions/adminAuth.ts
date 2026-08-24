"use server";

import { cookies } from "next/headers";

const ADMIN_USER = "admin";
const ADMIN_PASS = "OrderlyAdmin2026!";
const SESSION_COOKIE = "orderly_admin_session";

export async function loginAdmin(formData: FormData) {
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
}

export async function logoutAdmin() {
  cookies().delete(SESSION_COOKIE);
  return { success: true };
}

export async function isAuthenticated(): Promise<boolean> {
  const session = cookies().get(SESSION_COOKIE);
  return session?.value === "authenticated";
}