// Database connector. The only file that knows how to reach Mongo; every
// other module calls getDb(). Credentials come from the environment (.env
// locally, the host's dashboard in production) and are never committed.
import { MongoClient } from "mongodb";

let db;

export async function connect() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI is not set. Copy .env.example to .env.");

  const client = new MongoClient(uri);
  await client.connect();
  db = client.db(process.env.DB_NAME || "concertQuest");
  console.log(`Connected to MongoDB database "${db.databaseName}"`);
}

export function getDb() {
  if (!db) throw new Error("Call connect() before getDb()");
  return db;
}
