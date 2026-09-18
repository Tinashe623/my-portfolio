import { NextResponse } from "next/server";
import { listAllPosts } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await listAllPosts();

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching all blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}