import { kv } from '@vercel/kv'
import { put } from '@vercel/blob'
import { IStorage, StoredItem } from './types'

export class VercelStorage implements IStorage {
  async saveItem(id: string, item: StoredItem, ttl: number): Promise<void> {
    await kv.set(id, item, { ex: ttl })
  }

  async saveFile(id: string, file: File, ttl: number): Promise<string> {
    // We use the ID as the blob path to ensure uniqueness.
    // We could append extension if needed, but we store MIME type in metadata.
    const blob = await put(id, file, { access: 'public' })
    return blob.url
  }

  async getItem(id: string): Promise<StoredItem | null> {
    const item = await kv.get<StoredItem>(id)
    return item
  }
}
