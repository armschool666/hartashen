import { list, put } from "@vercel/blob";
import type { JsonStore } from "./json-store";

export function createBlobJsonStore<T>(blobKey: string, fallback: T): JsonStore<T> {
  async function read(): Promise<T> {
    try {
      const { blobs } = await list({ prefix: blobKey, limit: 1 });
      if (!blobs.length) return fallback;
      const res = await fetch(blobs[0].url, { cache: "no-store" });
      if (!res.ok) return fallback;
      return (await res.json()) as T;
    } catch {
      return fallback;
    }
  }

  async function write(value: T): Promise<void> {
    await put(blobKey, JSON.stringify(value, null, 2), {
      access: "public",
      addRandomSuffix: false,
    });
  }

  async function update(mutator: (current: T) => T | Promise<T>): Promise<T> {
    const current = await read();
    const next = await mutator(current);
    await write(next);
    return next;
  }

  return { read, write, update };
}
