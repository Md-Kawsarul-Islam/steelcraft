import { MongoClient } from "mongodb";

const globalForMongo = globalThis as unknown as { mongo?: { client: MongoClient; promise: Promise<MongoClient> } };

export async function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not configured. Add it to .env.local.");
  const existing = globalForMongo.mongo;
  if (existing) return (await existing.promise).db(process.env.MONGODB_DB || "Kawsar");
  const client = new MongoClient(uri);
  const promise = client.connect();
  const mongo = { client, promise };
  if (process.env.NODE_ENV !== "production") globalForMongo.mongo = mongo;
  return (await promise).db(process.env.MONGODB_DB || "Kawsar");
}
