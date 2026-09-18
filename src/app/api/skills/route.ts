import { NextResponse } from "next/server";
import { listSkills, createSkill } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth";
import { z } from "zod";

const skillSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  level: z
    .enum(["beginner", "intermediate", "advanced"])
    .default("intermediate"),
  icon: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
});

export async function GET() {
  try {
    const skills = await listSkills();

    return NextResponse.json({ skills });
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
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
    const parsed = skillSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const skill = await createSkill(parsed.data);

    return NextResponse.json({ skill }, { status: 201 });
  } catch (error) {
    console.error("Error creating skill:", error);
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    );
  }
}