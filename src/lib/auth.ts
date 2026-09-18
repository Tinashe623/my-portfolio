import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

export type AdminSession = {
  token: string;
  adminId: string;
  email: string;
  name: string;
};

export function getJwtSecret(): Uint8Array {
  const secret = process.env.NEXTAUTH_SECRET;

  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is not configured");
  }

  return new TextEncoder().encode(secret);
}

export async function getCurrentAdmin(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("admin-session");

  if (!adminCookie) {
    return null;
  }

  try {
    const session = JSON.parse(adminCookie.value) as AdminSession;

    if (!session.token) {
      return null;
    }

    const { payload } = await jwtVerify(session.token, getJwtSecret());

    if (payload.adminId !== session.adminId || payload.email !== session.email) {
      return null;
    }

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