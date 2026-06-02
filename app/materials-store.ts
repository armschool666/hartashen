import type { AdminEntry } from "./material-types";
import { createBlobJsonStore } from "./blob-json-store";

const store = createBlobJsonStore<AdminEntry[]>("data/materials.json", []);

export const readMaterials = () => store.read();
export const writeMaterials = (entries: AdminEntry[]) => store.write(entries);
export const updateMaterials = store.update;
