import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "your-secret-key";

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("admin-session");

  if (!adminCookie) {
    return null;
  }

  try {
    const session = JSON.parse(adminCookie.value);

    if (!session.token) {
      return null;
    }

    const decoded = jwt.verify(session.token, JWT_SECRET) as {
      adminId: string;
      email: string;
    };

    if (decoded.adminId !== session.adminId || decoded.email !== session.email) {
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
