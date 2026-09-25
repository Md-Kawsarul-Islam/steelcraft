import { NextResponse } from "next/server";
import { Resend } from "resend";
import { clientIp, rateLimit, sameOrigin, text, validEmail } from "@/lib/security";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  if (!rateLimit(`quote:${clientIp(req)}`, 5, 15 * 60 * 1000).allowed) return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429 });
  try {
    const body = await req.json();
    const name = text(body?.name, 120);
    const company = text(body?.company, 180);
    const phone = text(body?.phone, 40);
    const email = text(body?.email, 254);
    const product = text(body?.product, 180);
    const message = text(body?.message, 5000);
    if (!name || !phone || !message) return NextResponse.json({ message: "Name, phone and requirement are required." }, { status: 400 });
    if (email && !validEmail(email)) return NextResponse.json({ message: "Please provide a valid email address." }, { status: 400 });
    if (process.env.RESEND_API_KEY && process.env.QUOTE_TO_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "Website <onboarding@resend.dev>",
        to: process.env.QUOTE_TO_EMAIL,
        replyTo: email || undefined,
        subject: `New Quote Request — ${name}`,
        text: `Name: ${name}\nCompany: ${company}\nPhone: ${phone}\nEmail: ${email}\nProduct: ${product}\nRequirement: ${message}`,
      });
    }
    return NextResponse.json({ message: "Quotation request received successfully." });
  } catch { return NextResponse.json({ message: "Unable to process the request right now." }, { status: 500 }); }
}
