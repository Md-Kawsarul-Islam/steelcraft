import type { Metadata } from "next";
export const metadata: Metadata = { title: "Steel & Metal Fabrication Blog", description: "Practical industry knowledge, fabrication insights and project guidance from Kawsar." };
import {getBlogPosts} from "@/lib/data";
export const dynamic = "force-dynamic";
export default async function Blog(){ const posts=await getBlogPosts(); return <main className="section"><div className="container"><p style={{color:"#ca8a04",fontWeight:800}}>BLOG</p><h1>Latest Articles</h1><div className="grid-auto" style={{marginTop:28}}>{posts.length?posts.map((p:any)=><article className="card" style={{padding:25}} key={p.id}><small>Industry Knowledge</small>{p.featured_image&&<img src={p.featured_image} alt={p.title} style={{width:"100%",height:200,objectFit:"cover",borderRadius:10,margin:"15px 0"}}/>}<h2>{p.title}</h2><p>{p.content}</p></article>):<p style={{marginTop:25}}>No published articles yet.</p>}</div></div></main> }
