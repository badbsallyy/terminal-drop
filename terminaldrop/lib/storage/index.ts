import { LocalStorage } from './local'
import { VercelStorage } from './vercel'
import { IStorage } from './types'

const isVercel = !!(process.env.VERCEL || process.env.KV_REST_API_URL)

export const storage: IStorage = isVercel
  ? new VercelStorage()
  : new LocalStorage()

export * from './types'
