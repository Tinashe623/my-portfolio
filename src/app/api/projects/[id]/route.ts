import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { findProject, updateProject, deleteProject } from "@/lib/db";
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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const project = await findProject(id);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = projectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const project = await updateProject(id, parsed.data);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    revalidatePath("/portfolio");
    revalidatePath("/portfolio/[slug]", "page");
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await deleteProject(id);

    revalidatePath("/portfolio");
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}