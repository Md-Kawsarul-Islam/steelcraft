import { NextResponse } from "next/server";
import { adminCookie, adminCookieOptions } from "@/lib/admin-auth";
import { sameOrigin } from "@/lib/security";
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(adminCookie, "", { ...adminCookieOptions, maxAge: 0 });
  return res;
}
