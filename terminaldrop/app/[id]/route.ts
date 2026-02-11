import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'
import fs from 'fs'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = await storage.getItem(id)

  if (!item) {
    return new NextResponse('not found', { status: 404, headers: { 'Content-Type': 'text/plain' } })
  }

  if (Date.now() > item.metadata.expiresAt) {
    return new NextResponse('not found', { status: 404, headers: { 'Content-Type': 'text/plain' } })
  }

  const { type, mimeType, originalName, size } = item.metadata

  if (type === 'text' || type === 'url') {
     return new NextResponse(item.content, {
       headers: {
         'Content-Type': 'text/plain; charset=utf-8',
       }
     })
  } else if (type === 'file') {
    if (item.content.startsWith('local-file://')) {
       const filePath = item.content.replace('local-file://', '')

       try {
         await fs.promises.access(filePath)
         const stat = await fs.promises.stat(filePath)
         const buffer = await fs.promises.readFile(filePath)

         return new NextResponse(buffer, {
           headers: {
             'Content-Type': mimeType || 'application/octet-stream',
             'Content-Disposition': `attachment; filename="${originalName}"`,
             'Content-Length': stat.size.toString()
           }
         })

       } catch (e) {
         console.error('File read error:', e)
         return new NextResponse('file error', { status: 500 })
       }
    } else {
       const response = await fetch(item.content)
       if (!response.ok) {
         return new NextResponse('file fetch error', { status: 500 })
       }
       return new NextResponse(response.body, {
         headers: {
           'Content-Type': mimeType || 'application/octet-stream',
           'Content-Disposition': `attachment; filename="${originalName}"`,
           'Content-Length': size?.toString() || ''
         }
       })
    }
  }

  return new NextResponse('unknown type', { status: 500 })
}
