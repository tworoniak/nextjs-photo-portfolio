import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export interface ContactPayload {
  name: string;
  email: string;
  projectType: string;
  subject: string;
  message: string;
}

function validatePayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" && b.name.trim().length > 0 &&
    typeof b.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.subject === "string" && b.subject.trim().length > 0 &&
    typeof b.message === "string" && b.message.trim().length > 0 &&
    typeof b.projectType === "string" && b.projectType.trim().length > 0
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if ((body as Record<string, unknown>).website) {
    return NextResponse.json({ success: true });
  }

  if (!validatePayload(body)) {
    return NextResponse.json({ error: "Missing or invalid fields." }, { status: 422 });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!process.env.RESEND_API_KEY || !toEmail) {
    if (process.env.NODE_ENV === "development") {
      console.log("[contact form dev] submission received (not sent)");
      return NextResponse.json({ success: true });
    }
    return NextResponse.json(
      { error: "Contact form is temporarily unavailable." },
      { status: 503 }
    );
  }

  // Instantiate lazily so module evaluation never throws without a key
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: toEmail,
      replyTo: body.email,
      subject: `[Contact] ${body.subject}`,
      text: [
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        `Project type: ${body.projectType}`,
        ``,
        body.message,
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact form] Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
