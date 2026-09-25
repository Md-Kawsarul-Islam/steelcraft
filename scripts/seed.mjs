import { MongoClient } from "mongodb";
import { randomUUID } from "crypto";
import { readFileSync } from "fs";

const envPath = ".env.local";
try {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
} catch {}

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is missing. Create .env.local first.");
const client = new MongoClient(uri);
await client.connect();
const db = client.db(process.env.MONGODB_DB || "Kawsar");

const products = [
 {id:"1",title:"S.S. Stair Railing",category:"Railings",description:"Premium stainless-steel stair railing with clean finish and custom sizing.",image_url:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80"},
 {id:"2",title:"Fair Face Steel Shutter",category:"Shutters",description:"Strong, clean-finish shutter solution for residential and commercial spaces.",image_url:"https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80"},
 {id:"3",title:"M.S. Steel Shutter",category:"Shutters",description:"Durable mild-steel shutter customized to project requirements.",image_url:"https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"},
 {id:"4",title:"Main Gate",category:"Gates",description:"Custom fabricated entrance gate combining strength and appearance.",image_url:"https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80"},
 {id:"5",title:"Safety Canopy",category:"Canopies",description:"Fabricated protective canopy for construction and building entrances.",image_url:"https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80"},
 {id:"6",title:"CNC Cutting Service",category:"CNC",description:"High-precision CNC cutting for steel, stainless steel and aluminum.",image_url:"https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80"}
];
const projects = [
 {id:"1",title:"South Basrea",slug:"south-basrea",category:"Residential",client_name:"South Breeze Housing Ltd.",location:"Dhaka",description:"Steel shutter, window grill, sliding grill, verandah railing, main gate, stair railing and canopy.",cover_image:"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"},
 {id:"2",title:"South Leaf",slug:"south-leaf",category:"Residential",client_name:"South Breeze Housing Ltd.",location:"Gulshan, Dhaka",description:"Steel shutters, grills, railings, duplex stair & railing and safety canopy.",cover_image:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"},
 {id:"3",title:"South Square",slug:"south-square",category:"Commercial",client_name:"South Breeze Housing Ltd.",location:"Gulshan, Dhaka",description:"Steel shutters, duplex stair & railing, safety canopy and electrical cable trays.",cover_image:"https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80"}
];
const posts = [
 {id:randomUUID(),title:"How to plan a custom steel railing",slug:"how-to-plan-a-custom-steel-railing",content:"A practical guide to measurements, material and finishing.",featured_image:"",published:true},
 {id:randomUUID(),title:"Choosing the right steel shutter",slug:"choosing-the-right-steel-shutter",content:"Key considerations for security, durability and appearance.",featured_image:"",published:true}
];
for (const [name, docs] of [["products",products],["projects",projects],["blog_posts",posts]]) {
  const col=db.collection(name);
  if (await col.countDocuments() === 0) await col.insertMany(docs.map(d=>({...d,createdAt:new Date(),updatedAt:new Date()})));
}
await client.close();
console.log("Seed complete.");
