import { NextResponse } from "next/server";
import { listMessages, createMessage, deleteMessage } from "@/lib/db";
import { Resend } from "resend";
import { z } from "zod";
import { getCurrentAdmin } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const CONTACT_LIMIT = 3;
const CONTACT_WINDOW_MS = 60 * 60 * 1000;

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
  website: z.string().max(100).optional(),
});

let resend: Resend | null = null;

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  if (!resend) {
    resend = new Resend(apiKey);
  }

  return resend;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function requireAdminApi() {
  const admin = await getCurrentAdmin();
  return admin;
}

export async function GET() {
  const admin = await requireAdminApi();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const messages = await listMessages();

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, subject, message, website } = parsed.data;

  if (website) {
    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 201 }
    );
  }

  const ip = getClientIp(request);
  const ipLimit = rateLimit(`contact:ip:${ip}`, CONTACT_LIMIT, CONTACT_WINDOW_MS);

  if (!ipLimit.allowed) {
    return NextResponse.json(
      { error: "Too many messages from this IP. Please try again later." },
      { status: 429, headers: { "Retry-After": String(ipLimit.retryAfterSec) } }
    );
  }

  const emailLimit = rateLimit(
    `contact:email:${email.toLowerCase()}`,
    CONTACT_LIMIT,
    CONTACT_WINDOW_MS
  );

  if (!emailLimit.allowed) {
    return NextResponse.json(
      { error: "Too many messages from this address. Please try again later." },
      { status: 429, headers: { "Retry-After": String(emailLimit.retryAfterSec) } }
    );
  }

  try {
    const newMessage = await createMessage({
      name,
      email,
      subject: subject || "No subject",
      message,
    });

    if (process.env.RESEND_API_KEY) {
      try {
        const contactEmail = process.env.CONTACT_EMAIL || "tinashemundieta36@gmail.com";
        await getResend().emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [contactEmail],
          replyTo: email,
          subject: subject || "New Contact Form Message",
          html: `
            <h2>New message from your portfolio</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(subject || "No subject")}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
          `,
        });
      } catch (emailError) {
        console.error("Error sending email:", emailError);
      }
    }

    return NextResponse.json(
      { message: "Message sent successfully", data: newMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const admin = await requireAdminApi();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Message ID is required" },
        { status: 400 }
      );
    }

    await deleteMessage(id);

    return NextResponse.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { error: "Failed to delete message" },
      { status: 500 }
    );
  }
}