import { customAlphabet } from 'nanoid'
import { ID_CHARSET, ID_LENGTH } from './constants'
import { storage } from './storage'

const nanoid = customAlphabet(ID_CHARSET, ID_LENGTH)

export async function generateId(): Promise<string> {
  let id = nanoid()
  let attempts = 0

  // Check for collision
  while ((await storage.getItem(id)) && attempts < 5) {
    id = nanoid()
    attempts++
  }

  // If still collision, increase length
  if (await storage.getItem(id)) {
    const longerNanoid = customAlphabet(ID_CHARSET, ID_LENGTH + 1)
    id = longerNanoid()

    // One retry with longer ID
    if (await storage.getItem(id)) {
        id = customAlphabet(ID_CHARSET, 6)()
    }
  }

  return id
}
