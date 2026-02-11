export interface ItemMetadata {
  type: 'text' | 'url' | 'file'
  originalName?: string
  mimeType?: string
  size?: number
  createdAt: number
  expiresAt: number
}

export interface StoredItem {
  metadata: ItemMetadata
  content: string // text/url directly, or blob URL for file
}

export interface IStorage {
  // Saves the item (metadata + content) to KV/JSON
  saveItem(id: string, item: StoredItem, ttl?: number): Promise<void>

  // Saves the file binary to Blob/FS and returns the URL
  saveFile(id: string, file: File, ttl?: number): Promise<string>

  // Retrieves the item from KV/JSON
  getItem(id: string): Promise<StoredItem | null>
}
