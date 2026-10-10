// Shared by both routers: a request may edit a post if it carries that post's
// passcode or the admin passcode.
// TODO: store passcodes hashed (node:crypto scrypt), never return them to the
// client, and compare with timingSafeEqual.
export function canEdit(post, passcode) {
  return passcode === post.passcode || passcode === process.env.ADMIN_PASSCODE;
}
