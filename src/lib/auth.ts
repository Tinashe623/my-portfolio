import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("admin-session");

  if (!adminCookie) {
    return null;
  }

  try {
    const session = JSON.parse(adminCookie.value);
    return session;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }
  return admin;
}
