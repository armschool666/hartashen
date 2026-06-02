import { createHmac, timingSafeEqual } from "node:crypto";

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function signingKey(): string {
  const key = process.env.ADMIN_TOKEN;
  if (!key) throw new Error("ADMIN_TOKEN is not set");
  return key;
}

function sign(payload: string): string {
  return createHmac("sha256", signingKey()).update(payload).digest("hex");
}

export async function createSession(): Promise<{ token: string; maxAgeSec: number }> {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = String(expiresAt);
  const sig = sign(payload);
  const token = `${payload}.${sig}`;
  return { token, maxAgeSec: Math.floor(SESSION_TTL_MS / 1000) };
}

export async function isSessionValid(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot === -1) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = sign(payload);
  try {
    if (!timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"))) return false;
  } catch {
    return false;
  }
  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}

export async function revokeSession(_token: string | undefined): Promise<void> {
  // Stateless — revocation is handled by clearing the cookie on the client.
}
