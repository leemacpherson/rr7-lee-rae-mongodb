import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";

// Ensure this is server-only code
if (!process.env.ATLAS_URI) {
  throw new Error("Missing ATLAS_URI");
}

const client = new MongoClient(process.env.ATLAS_URI);
let db: ReturnType<MongoClient["db"]>;

export async function getDb() {
  if (db) return db;
  await client.connect();
  db = client.db("my_app_db");
  return db;
}
