import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const secret = process.env.NEXTAUTH_SECRET;

  if (!secret) {
    return false;
  }

  const cookie = request.cookies.get("admin-session");

  if (!cookie) {
    return false;
  }

  try {
    const session = JSON.parse(cookie.value) as {
      token?: string;
      adminId?: string;
      email?: string;
    };

    if (!session.token || !session.adminId || !session.email) {
      return false;
    }

    const { payload } = await jwtVerify(
      session.token,
      new TextEncoder().encode(secret)
    );

    return payload.adminId === session.adminId && payload.email === session.email;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authenticated = await isAuthenticated(request);

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!authenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (pathname.startsWith("/admin/login") && authenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};