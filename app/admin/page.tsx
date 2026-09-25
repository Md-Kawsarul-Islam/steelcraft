"use client"

import { useEffect, useState } from "react"

const tabs = ["Projects", "Products", "Blog"] as const
type Tab = typeof tabs[number]
type Row = Record<string, any>

export default function Admin() {
  const [configured, setConfigured] = useState(false)
  const [session, setSession] = useState(false)
  const [tab, setTab] = useState<Tab>("Projects")
  const [rows, setRows] = useState<Row[]>([])
  const [editing, setEditing] = useState<Row | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")

  async function checkSession() {
    const res = await fetch("/api/admin/session", { cache: "no-store" })
    const data = await res.json()
    setConfigured(Boolean(data.configured)); setSession(Boolean(data.authenticated)); setLoading(false)
  }
  useEffect(() => { checkSession() }, [])
  useEffect(() => { if (session) loadRows() }, [session, tab])

  async function login(e: React.FormEvent) {
    e.preventDefault(); setMessage("Signing in...")
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) })
    const data = await res.json(); setMessage(data.message || "")
    if (res.ok) { setSession(true); setEmail(""); setPassword("") }
  }
  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); setSession(false); setRows([]) }
  async function loadRows() {
    setLoading(true); const type = tab === "Projects" ? "projects" : tab === "Products" ? "products" : "blog_posts"
    const res = await fetch(`/api/admin/${type}`, { cache: "no-store" }); const data = await res.json()
    setRows(Array.isArray(data) ? data : []); if (!res.ok) setMessage(data.message || "Unable to load data"); setLoading(false)
  }
  function blank() {
    if (tab === "Projects") return { title: "", slug: "", category: "Residential", client_name: "", location: "", description: "", cover_image: "" }
    if (tab === "Products") return { title: "", slug: "", category: "Railings", description: "", image_url: "" }
    return { title: "", slug: "", content: "", featured_image: "", published: false }
  }
  async function save() {
    if (!editing) return
    const type = tab === "Projects" ? "projects" : tab === "Products" ? "products" : "blog_posts"
    if (!editing.title || !editing.slug) { setMessage("Title and slug are required."); return }
    const method = editing.id ? "PUT" : "POST"
    const res = await fetch(`/api/admin/${type}`, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) })
    const data = await res.json(); setMessage(res.ok ? "Saved successfully." : (data.message || "Save failed."))
    if (res.ok) { setEditing(null); loadRows() }
  }
  async function remove(id: string) {
    if (!confirm("Delete this item?")) return
    const type = tab === "Projects" ? "projects" : tab === "Products" ? "products" : "blog_posts"
    const res = await fetch(`/api/admin/${type}`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    const data = await res.json(); setMessage(res.ok ? "Deleted." : (data.message || "Delete failed.")); if (res.ok) loadRows()
  }

  if (!configured) return <main className="section"><div className="container" style={{ maxWidth: 760 }}><p style={{ color: "#ca8a04", fontWeight: 800 }}>ADMIN SETUP</p><h1>MongoDB setup required</h1><p>The website is running. Admin needs MongoDB and admin credentials.</p><div className="card" style={{ padding: 24, marginTop: 24 }}><ol style={{ lineHeight: 1.9, paddingLeft: 22 }}><li>Install and start MongoDB locally, or create a MongoDB Atlas database.</li><li>Create <code>.env.local</code> in the same folder as <code>package.json</code>.</li><li>Add <code>MONGODB_URI</code>, <code>MONGODB_DB</code>, <code>ADMIN_EMAIL</code>, <code>ADMIN_PASSWORD</code> and <code>ADMIN_SESSION_SECRET</code>.</li><li>Run <code>npm run seed</code> once to add the starter projects and products.</li><li>Restart with <code>npm run dev</code>, then open <strong>/admin</strong>.</li></ol><p style={{ marginTop: 16 }}>No Supabase is required.</p></div></div></main>
  if (loading && !session) return <main className="section"><div className="container"><p>Loading...</p></div></main>
  if (!session) return <main className="section"><div className="container" style={{ maxWidth: 520 }}><p style={{ color: "#ca8a04", fontWeight: 800 }}>ADMIN</p><h1>Admin Login</h1><p>Use the admin email and password from <code>.env.local</code>.</p><form onSubmit={login} className="card" style={{ padding: 24, display: "grid", gap: 14, marginTop: 24 }}><input className="admin-input" type="email" placeholder="Admin email" value={email} onChange={e => setEmail(e.target.value)} required /><input className="admin-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required /><button className="btn btn-primary" type="submit">Login</button>{message && <p>{message}</p>}</form></div></main>

  return <main className="section"><div className="container"><div style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "end", flexWrap: "wrap" }}><div><p style={{ color: "#ca8a04", fontWeight: 800 }}>ADMIN DASHBOARD</p><h1>Manage Website</h1><p>Update projects, client names, products and blog posts.</p></div><button className="btn btn-dark" onClick={logout}>Logout</button></div><div style={{ display: "flex", gap: 10, margin: "28px 0", flexWrap: "wrap" }}>{tabs.map(t => <button key={t} className={tab === t ? "btn btn-primary" : "btn btn-dark"} onClick={() => { setTab(t); setEditing(null) }}>{t}</button>)}<button className="btn" style={{ border: "1px solid #d1d5db" }} onClick={() => setEditing(blank())}>+ Add {tab === "Blog" ? "Post" : tab.slice(0, -1)}</button></div>{message && <div className="admin-message">{message}</div>}
    {editing && <section className="card" style={{ padding: 24, marginBottom: 28 }}><h2>{editing.id ? "Edit" : "Add"} {tab === "Blog" ? "Post" : tab.slice(0, -1)}</h2><div className="admin-form"><label>Title<input className="admin-input" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} /></label><label>Slug<input className="admin-input" value={editing.slug} onChange={e => setEditing({ ...editing, slug: e.target.value })} /></label>{tab === "Projects" && <><label>Category<input className="admin-input" value={editing.category || ""} onChange={e => setEditing({ ...editing, category: e.target.value })} /></label><label>Client Name<input className="admin-input" value={editing.client_name || ""} onChange={e => setEditing({ ...editing, client_name: e.target.value })} /></label><label>Location<input className="admin-input" value={editing.location || ""} onChange={e => setEditing({ ...editing, location: e.target.value })} /></label><label>Project Image URL<input className="admin-input" value={editing.cover_image || ""} onChange={e => setEditing({ ...editing, cover_image: e.target.value })} /></label></>}{tab === "Products" && <><label>Category<input className="admin-input" value={editing.category || ""} onChange={e => setEditing({ ...editing, category: e.target.value })} /></label><label>Product Image URL<input className="admin-input" value={editing.image_url || ""} onChange={e => setEditing({ ...editing, image_url: e.target.value })} /></label></>}{tab === "Blog" && <><label>Featured Image URL<input className="admin-input" value={editing.featured_image || ""} onChange={e => setEditing({ ...editing, featured_image: e.target.value })} /></label><label className="check"><input type="checkbox" checked={!!editing.published} onChange={e => setEditing({ ...editing, published: e.target.checked })} /> Published</label></>}<label>{tab === "Blog" ? "Content" : "Description"}<textarea className="admin-input" rows={7} value={editing[tab === "Blog" ? "content" : "description"] || ""} onChange={e => setEditing({ ...editing, [tab === "Blog" ? "content" : "description"]: e.target.value })} /></label></div><div style={{ display: "flex", gap: 10, marginTop: 18 }}><button className="btn btn-primary" onClick={save}>Save</button><button className="btn" style={{ border: "1px solid #d1d5db" }} onClick={() => setEditing(null)}>Cancel</button></div></section>}
    {loading ? <p>Loading...</p> : <div className="admin-list">{rows.map(row => <div className="card admin-row" key={row.id}><div><strong>{row.title}</strong><p>{tab === "Projects" ? row.client_name : tab === "Products" ? row.description : (row.published ? "Published" : "Draft")}</p></div><div style={{ display: "flex", gap: 8 }}><button className="btn" style={{ border: "1px solid #d1d5db" }} onClick={() => setEditing(row)}>Edit</button><button className="btn" style={{ border: "1px solid #ef4444", color: "#dc2626" }} onClick={() => remove(row.id)}>Delete</button></div></div>)}</div>}</div></main>
}
