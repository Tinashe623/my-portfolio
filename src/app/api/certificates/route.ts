import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { listCertificates, createCertificate } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth";
import { z } from "zod";

const certificateSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  issuer: z.string().min(1),
  issueDate: z.string().min(1),
  expiryDate: z.string().optional().nullable(),
  credentialId: z.string().optional().nullable(),
  credentialUrl: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(),
  verified: z.boolean().optional(),
});

export async function GET() {
  try {
    const certificates = await listCertificates();

    return NextResponse.json({ certificates });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificates" },
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
    const parsed = certificateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const certificate = await createCertificate(parsed.data);

    revalidatePath("/certificates");

    return NextResponse.json({ certificate }, { status: 201 });
  } catch (error) {
    console.error("Error creating certificate:", error);
    return NextResponse.json(
      { error: "Failed to create certificate" },
      { status: 500 }
    );
  }
}