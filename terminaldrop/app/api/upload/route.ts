import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'
import { generateId } from '@/lib/id-generator'
import { MAX_FILE_SIZE, MAX_TEXT_LENGTH, BASE_URL } from '@/lib/constants'
import { ItemMetadata } from '@/lib/storage/types'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const content = formData.get('content') as string | null
    const file = formData.get('file') as File | null
    const ttlStr = formData.get('ttl') as string | null
    const ttl = parseInt(ttlStr || '86400', 10)

    if (!content && !file) {
      return NextResponse.json({ error: 'No content provided' }, { status: 400 })
    }

    if (file && file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }

    if (content && content.length > MAX_TEXT_LENGTH) {
      return NextResponse.json({ error: 'Text too long' }, { status: 400 })
    }

    const id = await generateId()
    const expiresAt = Date.now() + ttl * 1000

    let type: 'text' | 'url' | 'file' = 'text'
    let storedContent = ''
    const metadata: ItemMetadata = { 
      type: 'text',
      createdAt: Date.now(), 
      expiresAt 
    }

    if (file) {
      type = 'file'
      storedContent = await storage.saveFile(id, file, ttl)
      metadata.type = type
      metadata.originalName = file.name
      metadata.mimeType = file.type
      metadata.size = file.size
    } else if (content) {
      storedContent = content
      if (content.match(/^https?:\/\//)) {
        type = 'url'
      }
      metadata.type = type
      metadata.size = content.length
    }

    await storage.saveItem(id, { metadata, content: storedContent }, ttl)

    return NextResponse.json({
      success: true,
      id,
      url: `${BASE_URL}/${id}`,
      curl: `curl ${BASE_URL}/${id}`,
      expiresIn: ttlStr,
      type
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
