import { NextResponse } from "next/server";
import {
  countCertificates,
  countDraftPosts,
  countMessages,
  countProjects,
  countPublishedPosts,
  countSkills,
  countTestimonials,
  countUnreadMessages,
} from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [projects, published, drafts, messages, unread, certificates, skills, testimonials] =
      await Promise.all([
        countProjects(),
        countPublishedPosts(),
        countDraftPosts(),
        countMessages(),
        countUnreadMessages(),
        countCertificates(),
        countSkills(),
        countTestimonials(),
      ]);

    return NextResponse.json({
      projects,
      blogPosts: published + drafts,
      published,
      drafts,
      messages,
      unread,
      certificates,
      skills,
      testimonials,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin stats" },
      { status: 500 }
    );
  }
}