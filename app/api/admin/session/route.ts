import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
export async function GET() {
  const configured = Boolean(process.env.MONGODB_URI && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET && process.env.ADMIN_SESSION_SECRET.length >= 32);
  return NextResponse.json({ authenticated: configured ? await isAdmin() : false, configured }, { headers: { "Cache-Control": "no-store" } });
}
