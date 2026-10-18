// Seeds the concerts collection with real Boston concerts from
// seed-data.json: `npm run seed`. (Julian Bowen)
//
// Safe to re-run against the live database. Each entry has a stable seedId;
// re-running updates those concerts in place (same _id, so their reviews
// stay attached) and never touches concerts users posted. Removing an entry
// from the JSON does not delete it from the database.
//
// Seeded concerts get a random passcode nobody knows, so only
// ADMIN_PASSCODE can edit or delete them.
import { randomBytes } from "node:crypto";
import { readFile } from "node:fs/promises";

import { close, connect, getDb } from "./db/connection.js";
import { hashPasscode } from "./passcode.js";
import { parseConcert } from "./routes/concerts.js";

const SEED_FILE = new URL("./seed-data.json", import.meta.url);
const POSTER_NAME = "Concert Quest team";

const entries = JSON.parse(await readFile(SEED_FILE, "utf8"));

// Validate everything with the API's own rules before touching the database.
const seen = new Set();
const operations = entries.map((entry, index) => {
  const label = `seed-data.json entry ${index} (${entry.seedId})`;
  if (!entry.seedId) throw new Error(`${label}: seedId is required`);
  if (seen.has(entry.seedId)) throw new Error(`${label}: duplicate seedId`);
  seen.add(entry.seedId);

  const { concert, error } = parseConcert({
    ...entry,
    posterName: POSTER_NAME,
  });
  if (error) throw new Error(`${label}: ${error}`);

  const now = new Date();
  return {
    updateOne: {
      filter: { seedId: entry.seedId },
      update: {
        $set: { ...concert, updatedAt: now },
        $setOnInsert: {
          seedId: entry.seedId,
          passcodeHash: hashPasscode(randomBytes(24).toString("hex")),
          createdAt: now,
        },
      },
      upsert: true,
    },
  };
});

await connect();
try {
  const result = await getDb()
    .collection("concerts")
    .bulkWrite(operations, { ordered: true });
  console.log(
    `Seeded ${entries.length} concerts: ${result.upsertedCount} added, ` +
      `${result.matchedCount} updated.`
  );
} finally {
  await close();
}
