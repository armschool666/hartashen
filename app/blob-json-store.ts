import { head, list, put } from "@vercel/blob";
import type { JsonStore } from "./json-store";

export function createBlobJsonStore<T>(blobKey: string, fallback: T): JsonStore<T> {
  // Module-level cache: avoids list() round-trip within the same instance
  let cachedUrl: string | null = null;

  async function getBlobUrl(): Promise<string | null> {
    if (cachedUrl) {
      try {
        await head(cachedUrl);
        return cachedUrl;
      } catch {
        cachedUrl = null;
      }
    }
    const { blobs } = await list({ prefix: blobKey, limit: 1 });
    console.log(`[blob-store] list("${blobKey}") → ${blobs.length} blobs`, blobs.map(b => b.url));
    if (blobs.length > 0) {
      cachedUrl = blobs[0].url;
      return cachedUrl;
    }
    return null;
  }

  async function read(): Promise<T> {
    try {
      const url = await getBlobUrl();
      console.log(`[blob-store] read url=${url ?? "null"}`);
      if (!url) return fallback;
      const res = await fetch(url, { cache: "no-store" });
      console.log(`[blob-store] fetch status=${res.status}`);
      if (!res.ok) return fallback;
      const data = (await res.json()) as T;
      console.log(`[blob-store] parsed entries count=${Array.isArray(data) ? data.length : "?"}`);
      return data;
    } catch (err) {
      console.error(`[blob-store] read error:`, err);
      return fallback;
    }
  }

  async function write(value: T): Promise<void> {
    const blob = await put(blobKey, JSON.stringify(value, null, 2), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    cachedUrl = blob.url;
  }

  async function update(mutator: (current: T) => T | Promise<T>): Promise<T> {
    const current = await read();
    const next = await mutator(current);
    await write(next);
    return next;
  }

  return { read, write, update };
}
