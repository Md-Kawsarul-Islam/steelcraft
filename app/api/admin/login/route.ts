import { NextResponse } from "next/server";
import { adminCookie, adminCookieOptions, createAdminToken } from "@/lib/admin-auth";
import { clientIp, rateLimit, safeEqual, sameOrigin, text } from "@/lib/security";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  const ip = clientIp(req);
  if (!rateLimit(`admin-login:${ip}`, 5, 15 * 60 * 1000).allowed) return NextResponse.json({ message: "Too many login attempts. Please try again later." }, { status: 429 });
  try {
    const body = await req.json();
    const email = text(body?.email, 254);
    const password = typeof body?.password === "string" ? body.password : "";
    const configured = Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
    if (!configured) return NextResponse.json({ message: "Admin authentication is not configured." }, { status: 503 });
    if (!safeEqual(email, process.env.ADMIN_EMAIL!) || !safeEqual(password, process.env.ADMIN_PASSWORD!)) return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    const res = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
    res.cookies.set(adminCookie, createAdminToken(), adminCookieOptions);
    return res;
  } catch { return NextResponse.json({ message: "Invalid request." }, { status: 400 }); }
}
