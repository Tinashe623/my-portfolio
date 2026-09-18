import { NextResponse } from "next/server";
import { listTestimonials, createTestimonial } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth";
import { z } from "zod";

const testimonialSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  company: z.string().min(1),
  content: z.string().min(1),
  avatar: z.string().optional().nullable(),
  rating: z.number().int().min(1).max(5).optional(),
  featured: z.boolean().optional(),
});

export async function GET() {
  try {
    const testimonials = await listTestimonials();

    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
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
    const parsed = testimonialSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const testimonial = await createTestimonial(parsed.data);

    return NextResponse.json({ testimonial }, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}