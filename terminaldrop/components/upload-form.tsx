'use client'

import { useState } from 'react'
import { DropZone } from './drop-zone'
import { SuccessDisplay } from './success-display'
import { ExpirySelector } from './expiry-selector'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Loader2, ArrowRight } from 'lucide-react'
import { DEFAULT_TTL } from '@/lib/constants'

export function UploadForm() {
  const [mode, setMode] = useState<'none' | 'text' | 'file'>('none')
  const [textContent, setTextContent] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [ttl, setTtl] = useState(DEFAULT_TTL.toString())
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ url: string; curl: string; id: string; type: string } | null>(null)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setTextContent(value)
    if (value.trim()) {
      setMode('text')
      setSelectedFile(null)
    } else {
      setMode('none')
    }
  }

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setMode('file')
    setTextContent('')
  }

  const handleClear = () => {
    setMode('none')
    setTextContent('')
    setSelectedFile(null)
  }

  const handleSubmit = async () => {
    if (mode === 'none') return

    setLoading(true)
    const formData = new FormData()
    formData.append('ttl', ttl)

    if (mode === 'text') {
      formData.append('content', textContent)
    } else if (mode === 'file' && selectedFile) {
      formData.append('file', selectedFile)
    }

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setResult(data)
      toast.success('Dropped successfully!')
    } catch (err) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return <SuccessDisplay result={result} onReset={() => {
      setResult(null)
      handleClear()
    }} />
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-6">
        <div className="relative group">
          <Textarea
            placeholder="Paste text, code or URL here..."
            className={`min-h-[120px] font-mono text-sm resize-none transition-all duration-200
              ${mode === 'file' ? 'opacity-50 grayscale' : 'opacity-100'}
              ${mode === 'text' ? 'border-primary ring-1 ring-primary' : ''}
            `}
            value={textContent}
            onChange={handleTextChange}
            disabled={loading}
          />
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <DropZone
          onFileSelect={handleFileSelect}
          selectedFile={selectedFile}
          onClear={handleClear}
          disabled={loading}
          isActive={mode === 'file'}
        />
      </div>

      <div className="flex items-center justify-between gap-4 pt-4 border-t border-muted/50">
        <ExpirySelector value={ttl} onChange={setTtl} />

        <Button
          size="lg"
          className="w-full sm:w-auto min-w-[140px] gap-2 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
          disabled={mode === 'none' || loading}
          onClick={handleSubmit}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Dropping...
            </>
          ) : (
            <>
              Drop it
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      <div className="text-center h-6">
         {mode === 'text' && (
           <p className="text-xs text-muted-foreground animate-in fade-in">
             Uploading: {textContent.length} chars (Text)
           </p>
         )}
         {mode === 'file' && selectedFile && (
           <p className="text-xs text-muted-foreground animate-in fade-in">
             Uploading: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
           </p>
         )}
      </div>
    </div>
  )
}
