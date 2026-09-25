import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { isAdmin } from "@/lib/admin-auth";
import { clientIp, rateLimit, sameOrigin, text } from "@/lib/security";
import { randomUUID } from "crypto";

const allowed = new Set(["projects", "products", "blog_posts"]);
function table(type: string) { if (!allowed.has(type)) throw new Error("Invalid collection"); return type; }
function clean(row: any) { const { _id, ...rest } = row; return rest; }

async function guard(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (!rateLimit(`admin-api:${clientIp(req)}`, 120, 60 * 1000).allowed) return NextResponse.json({ message: "Too many requests." }, { status: 429 });
  return null;
}

function sanitize(type: string, body: any, existing?: any) {
  const now = new Date();
  const title = text(body?.title, 180);
  const slug = text(body?.slug, 180).toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
  if (!title || !slug) throw new Error("Title and slug are required.");
  const base: any = { ...existing, title, slug, updatedAt: now };
  if (type === "projects") Object.assign(base, { category: text(body.category, 80), client_name: text(body.client_name, 180), location: text(body.location, 180), description: text(body.description, 5000), scope: text(body.scope || body.description, 5000), cover_image: text(body.cover_image, 1000), image: text(body.image || body.cover_image, 1000) });
  if (type === "products") Object.assign(base, { category: text(body.category, 80), description: text(body.description, 5000), image_url: text(body.image_url, 1000), image: text(body.image || body.image_url, 1000) });
  if (type === "blog_posts") Object.assign(base, { content: text(body.content, 15000), featured_image: text(body.featured_image, 1000), published: Boolean(body.published) });
  return base;
}

export async function GET(req: Request, { params }: { params: Promise<{ type: string }> }) {
  const denied = await guard(req); if (denied) return denied;
  try { const { type } = await params; const db = await getDb(); const rows = await db.collection(table(type)).find({}).sort({ createdAt: -1 }).limit(500).toArray(); return NextResponse.json(rows.map(clean), { headers: { "Cache-Control": "no-store" } }); }
catch (e: any) {
  console.error("ADMIN GET ERROR:", e);
  return NextResponse.json(
    { message: e?.message || "Unable to load data." },
    { status: 500 }
  );
}}

export async function POST(req: Request, { params }: { params: Promise<{ type: string }> }) {
  const denied = await guard(req); if (denied) return denied;
  try { const { type } = await params; const body = await req.json(); const doc = sanitize(type, body, { id: randomUUID(), createdAt: new Date() }); delete doc._id; const db = await getDb(); await db.collection(table(type)).insertOne(doc); return NextResponse.json({ ok: true, item: clean(doc) }); }
  catch (e: any) { return NextResponse.json({ message: e?.message || "Unable to save item." }, { status: 400 }); }
}

export async function PUT(req: Request, { params }: { params: Promise<{ type: string }> }) {
  const denied = await guard(req); if (denied) return denied;
  try { const { type } = await params; const body = await req.json(); const id = text(body?.id, 100); if (!id) return NextResponse.json({ message: "ID is required." }, { status: 400 }); const db = await getDb(); const current = await db.collection(table(type)).findOne({ id }); if (!current) return NextResponse.json({ message: "Item not found." }, { status: 404 }); const changes = sanitize(type, body, {}); delete changes.id; delete changes.createdAt; delete changes._id; const result = await db.collection(table(type)).updateOne({ id }, { $set: changes }); if (!result.matchedCount) return NextResponse.json({ message: "Item not found." }, { status: 404 }); return NextResponse.json({ ok: true }); }
  catch (e: any) { return NextResponse.json({ message: e?.message || "Unable to update item." }, { status: 400 }); }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ type: string }> }) {
  const denied = await guard(req); if (denied) return denied;
  try { const { type } = await params; const body = await req.json(); const id = text(body?.id, 100); if (!id) return NextResponse.json({ message: "ID is required." }, { status: 400 }); const db = await getDb(); const result = await db.collection(table(type)).deleteOne({ id }); if (!result.deletedCount) return NextResponse.json({ message: "Item not found." }, { status: 404 }); return NextResponse.json({ ok: true }); }
  catch { return NextResponse.json({ message: "Unable to delete item." }, { status: 500 }); }
}
