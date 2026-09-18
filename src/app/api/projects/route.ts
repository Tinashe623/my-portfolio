import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { listProjects, createProject } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  content: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  images: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().min(1),
  status: z.enum(["completed", "in-progress", "featured"]).optional(),
  featured: z.boolean().optional(),
  liveUrl: z.string().optional().nullable(),
  codeUrl: z.string().optional().nullable(),
  clientName: z.string().optional().nullable(),
  testimonial: z.string().optional().nullable(),
  testimonialAuthor: z.string().optional().nullable(),
});

export async function GET() {
  try {
    const projects = await listProjects();

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = projectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const project = await createProject(parsed.data);

    revalidatePath("/portfolio");
    revalidatePath("/portfolio/[slug]", "page");
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}