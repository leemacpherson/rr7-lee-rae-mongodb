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
  db = client.db("lee-rae-mongodb");
  console.log("in the db.server and it just connected to the database");
  return db;
}

export async function closeDb() {
  if (client) {
    await client.close();
    console.log("in db.server and we just closed the database connection");
  } else {
    console.log("in db.server and there was no client to close");
  }
}
