import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.redirect(new URL("/", process.env.NEXTAUTH_URL || "http://localhost:3000"));
  response.cookies.delete("admin-session");
  return response;
}
