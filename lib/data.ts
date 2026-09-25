import { getDb } from "@/lib/mongodb";

export const fallbackCategories = ["All", "Railings", "Shutters", "Gates", "Canopies", "CNC", "Metal Works"];

export const fallbackProducts = [
 {id:"1",title:"S.S. Stair Railing",category:"Railings",description:"Premium stainless-steel stair railing with clean finish and custom sizing.",image:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80"},
 {id:"2",title:"Fair Face Steel Shutter",category:"Shutters",description:"Strong, clean-finish shutter solution for residential and commercial spaces.",image:"https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80"},
 {id:"3",title:"M.S. Steel Shutter",category:"Shutters",description:"Durable mild-steel shutter customized to project requirements.",image:"https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"},
 {id:"4",title:"Main Gate",category:"Gates",description:"Custom fabricated entrance gate combining strength and appearance.",image:"https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80"},
 {id:"5",title:"Safety Canopy",category:"Canopies",description:"Fabricated protective canopy for construction and building entrances.",image:"https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80"},
 {id:"6",title:"CNC Cutting Service",category:"CNC",description:"High-precision CNC cutting for steel, stainless steel and aluminum.",image:"https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80"}
];

export const fallbackProjects = [
 {id:"1",title:"South Basrea",category:"Residential",client:"South Breeze Housing Ltd.",client_name:"South Breeze Housing Ltd.",location:"Dhaka",scope:"Steel shutter, window grill, sliding grill, verandah railing, main gate, stair railing and canopy.",description:"Steel shutter, window grill, sliding grill, verandah railing, main gate, stair railing and canopy.",image:"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",cover_image:"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"},
 {id:"2",title:"South Leaf",category:"Residential",client:"South Breeze Housing Ltd.",client_name:"South Breeze Housing Ltd.",location:"Gulshan, Dhaka",scope:"Steel shutters, grills, railings, duplex stair & railing and safety canopy.",description:"Steel shutters, grills, railings, duplex stair & railing and safety canopy.",image:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",cover_image:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"},
 {id:"3",title:"South Square",category:"Commercial",client:"South Breeze Housing Ltd.",client_name:"South Breeze Housing Ltd.",location:"Gulshan, Dhaka",scope:"Steel shutters, duplex stair & railing, safety canopy and electrical cable trays.",description:"Steel shutters, duplex stair & railing, safety canopy and electrical cable trays.",image:"https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",cover_image:"https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80"}
];

export async function getProducts() {
  try { const db = await getDb(); const rows = await db.collection("products").find({}).sort({createdAt: -1}).toArray(); return rows.length ? rows.map(clean) : fallbackProducts; }
  catch { return fallbackProducts; }
}
export async function getProjects() {
  try { const db = await getDb(); const rows = await db.collection("projects").find({}).sort({createdAt: -1}).toArray(); return rows.length ? rows.map(clean) : fallbackProjects; }
  catch { return fallbackProjects; }
}
export async function getBlogPosts() {
  try { const db = await getDb(); const rows = await db.collection("blog_posts").find({published: true}).sort({createdAt: -1}).toArray(); return rows.map(clean); }
  catch { return []; }
}
function clean(row: any) { const { _id, ...rest } = row; return rest; }
