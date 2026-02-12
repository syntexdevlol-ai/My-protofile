import { db } from "./db";
import {
  settings,
  type Settings
} from "@shared/schema";

export interface IStorage {
  // We can add settings storage here if needed later
  getSettings(): Promise<Settings | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getSettings(): Promise<Settings | undefined> {
    const [setting] = await db.select().from(settings).limit(1);
    return setting;
  }
}

export const storage = new DatabaseStorage();
