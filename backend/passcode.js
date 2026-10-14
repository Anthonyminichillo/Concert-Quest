// Shared by both routers: a request may edit a post if it carries that post's
// passcode or the admin passcode.
//
// Posts store `passcodeHash` ("salt:hash", scrypt), never the passcode itself.
// Strip it with withoutPasscode() before sending a post to the client.
//
// Everything here is synchronous on purpose: an async canEdit() would return
// a Promise, which is always truthy, so a forgotten `await` would let anyone
// edit anything.
import {
  createHash,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";

const KEY_LENGTH = 64;

export function hashPasscode(passcode) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(passcode, salt, KEY_LENGTH).toString("hex");
  return `${salt}:${hash}`;
}

function matchesHash(passcode, stored) {
  const [salt, hash] = String(stored).split(":");
  if (!salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  if (expected.length !== KEY_LENGTH) return false;
  return timingSafeEqual(scryptSync(passcode, salt, KEY_LENGTH), expected);
}

// timingSafeEqual needs equal-length buffers, so compare digests.
function matchesAdmin(passcode) {
  const admin = process.env.ADMIN_PASSCODE;
  if (!admin) return false;
  const digest = (value) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(passcode), digest(admin));
}

export function canEdit(post, passcode) {
  if (typeof passcode !== "string" || passcode === "") return false;
  return matchesAdmin(passcode) || matchesHash(passcode, post.passcodeHash);
}

export function withoutPasscode(post) {
  const copy = { ...post };
  delete copy.passcodeHash;
  return copy;
}
