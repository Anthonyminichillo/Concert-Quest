// Concerts collection: data access only, no Express here. (Julian Bowen)
// Documents are returned as stored, passcodeHash included; the router strips
// it before anything reaches the client.
import { ObjectId } from "mongodb";
import { getDb } from "./connection.js";

const concerts = () => getDb().collection("concerts");

// Unknown or malformed ids match nothing instead of throwing.
const byId = (id) => (ObjectId.isValid(id) ? { _id: new ObjectId(id) } : null);

// Upcoming concerts soonest first, or past concerts most recent first.
// Free means price 0.
export function listConcerts({ freeOnly = false, past = false } = {}) {
  const now = new Date();
  const filter = { date: past ? { $lt: now } : { $gte: now } };
  if (freeOnly) filter.price = 0;
  return concerts()
    .find(filter)
    .sort({ date: past ? -1 : 1 })
    .toArray();
}

export function getConcert(id) {
  const filter = byId(id);
  return filter ? concerts().findOne(filter) : null;
}

export async function createConcert(data) {
  const now = new Date();
  const doc = { ...data, createdAt: now, updatedAt: now };
  const { insertedId } = await concerts().insertOne(doc);
  return { _id: insertedId, ...doc };
}

// Resolves with the updated concert, or null if it doesn't exist.
export function updateConcert(id, data) {
  const filter = byId(id);
  if (!filter) return null;
  return concerts().findOneAndUpdate(
    filter,
    { $set: { ...data, updatedAt: new Date() } },
    { returnDocument: "after" }
  );
}

// Resolves with true if a concert was deleted.
export async function deleteConcert(id) {
  const filter = byId(id);
  if (!filter) return false;
  const { deletedCount } = await concerts().deleteOne(filter);
  return deletedCount === 1;
}
