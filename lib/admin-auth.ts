import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "Kawsar_admin";
const TTL_MS = 1000 * 60 * 60 * 8;

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("ADMIN_SESSION_SECRET must be configured and at least 32 characters long.");
  return value;
}

function sign(value: string) { return createHmac("sha256", secret()).update(value).digest("hex"); }

export function createAdminToken() {
  const value = `admin:${Date.now()}`;
  return `${value}.${sign(value)}`;
}

export function verifyAdminToken(token?: string) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [value, signature] = parts;
  const expected = sign(value);
  if (signature.length !== expected.length) return false;
  try { if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false; } catch { return false; }
  const timestamp = Number(value.split(":")[1]);
  return Number.isFinite(timestamp) && timestamp > 0 && Date.now() - timestamp < TTL_MS;
}

export async function isAdmin() {
  try { const store = await cookies(); return verifyAdminToken(store.get(COOKIE_NAME)?.value); } catch { return false; }
}

export const adminCookie = COOKIE_NAME;
export const adminCookieOptions = { httpOnly: true, sameSite: "strict" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge: TTL_MS / 1000 };
