import fs from 'fs/promises'
import path from 'path'
import { IStorage, StoredItem } from './types'

const DATA_DIR = path.join(process.cwd(), '.data')
const FILES_DIR = path.join(DATA_DIR, 'files')

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.mkdir(FILES_DIR, { recursive: true })
}

export class LocalStorage implements IStorage {
  constructor() {
    ensureDir().catch(console.error)
  }

  private getMetaPath(id: string) {
    return path.join(DATA_DIR, `${id}.json`)
  }

  private getFilePath(id: string) {
    return path.join(FILES_DIR, id)
  }

  async saveItem(id: string, item: StoredItem): Promise<void> {
    await ensureDir()
    await fs.writeFile(this.getMetaPath(id), JSON.stringify(item))
  }

  async saveFile(id: string, file: File): Promise<string> {
    await ensureDir()
    const buffer = Buffer.from(await file.arrayBuffer())
    const filePath = this.getFilePath(id)
    await fs.writeFile(filePath, buffer)
    return `local-file://${filePath}`
  }

  async getItem(id: string): Promise<StoredItem | null> {
    try {
      const data = await fs.readFile(this.getMetaPath(id), 'utf-8')
      const item: StoredItem = JSON.parse(data)

      // Check expiration
      if (Date.now() > item.metadata.expiresAt) {
        await this.deleteItem(id, item)
        return null
      }
      return item
    } catch (error) {
      // Type guard for Node.js filesystem errors
      if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === 'ENOENT') {
        return null
      }
      throw error
    }
  }

  private async deleteItem(id: string, item: StoredItem) {
    try {
      await fs.unlink(this.getMetaPath(id))
      if (item.metadata.type === 'file' && item.content.startsWith('local-file://')) {
          const filePath = item.content.replace('local-file://', '')
          await fs.unlink(filePath).catch(() => {})
      }
    } catch (e) {
      console.error('Error deleting expired item:', e)
    }
  }
}
