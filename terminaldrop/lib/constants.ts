
export const TTL_OPTIONS = [
  { label: '1 hour', value: 3600 },
  { label: '6 hours', value: 21600 },
  { label: '24 hours', value: 86400 },
  { label: '7 days', value: 604800 },
] as const

export const DEFAULT_TTL = 86400
export const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB
export const MAX_TEXT_LENGTH = 500000 // ~500KB text
export const ID_LENGTH = 4
export const ID_CHARSET = 'abcdefghjkmnpqrstuvwxyz23456789' // no i, l, o, 0, 1
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
