import { NextResponse } from "next/server";
import { findAdminByEmail } from "@/lib/db";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { getJwtSecret } from "@/lib/auth";

const IP_LIMIT = 5;
const IP_WINDOW_MS = 15 * 60 * 1000;
const EMAIL_LIMIT = 10;
const EMAIL_WINDOW_MS = 15 * 60 * 1000;
const TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);

    const ipLimit = rateLimit(`login:ip:${ip}`, IP_LIMIT, IP_WINDOW_MS);
    if (!ipLimit.allowed) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": String(ipLimit.retryAfterSec) } }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const emailKey = String(email).toLowerCase();
    const emailLimit = rateLimit(`login:email:${emailKey}`, EMAIL_LIMIT, EMAIL_WINDOW_MS);
    if (!emailLimit.allowed) {
      return NextResponse.json(
        { error: "Too many login attempts for this account. Please try again later." },
        { status: 429, headers: { "Retry-After": String(emailLimit.retryAfterSec) } }
      );
    }

    const admin = await findAdminByEmail(emailKey);

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = await new SignJWT({ adminId: admin.id, email: admin.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(`${TOKEN_MAX_AGE_SECONDS}s`)
      .sign(getJwtSecret());

    const response = NextResponse.json(
      {
        message: "Login successful",
        admin: { id: admin.id, email: admin.email, name: admin.name },
      },
      { status: 200 }
    );

    response.cookies.set(
      "admin-session",
      JSON.stringify({
        token,
        adminId: admin.id,
        email: admin.email,
        name: admin.name,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: TOKEN_MAX_AGE_SECONDS,
        path: "/",
      }
    );

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}