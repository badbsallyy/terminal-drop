'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, RotateCcw, Check, Terminal } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface SuccessDisplayProps {
  result: {
    url: string
    curl: string
    id: string
    type: string
  }
  onReset: () => void
}

export function SuccessDisplay({ result, onReset }: SuccessDisplayProps) {
  const [copiedUrl, setCopiedUrl] = useState(false)
  const [copiedCurl, setCopiedCurl] = useState(false)

  const copyToClipboard = async (text: string, type: 'url' | 'curl') => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === 'url') {
        setCopiedUrl(true)
        setTimeout(() => setCopiedUrl(false), 2000)
      } else {
        setCopiedCurl(true)
        setTimeout(() => setCopiedCurl(false), 2000)
      }
      toast.success("Copied to clipboard!")
    } catch {
      toast.error("Failed to copy")
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-emerald-500/20 bg-background/50 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
      <CardContent className="p-6 space-y-6">
        <div className="flex flex-col items-center gap-2 text-center pb-4">
          <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 mb-2 animate-bounce">
            <Check className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Dropped successfully!</h2>
          <p className="text-muted-foreground">Your {result.type} is ready to share.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Share Link</label>
            <div className="flex gap-2">
              <div className="flex-1 bg-muted p-3 rounded-md font-mono text-sm truncate flex items-center border border-border/50 select-all">
                {result.url}
              </div>
              <Button
                variant="outline"
                size="icon"
                className={cn("shrink-0", copiedUrl && "text-emerald-500 border-emerald-500/50 bg-emerald-500/10")}
                onClick={() => copyToClipboard(result.url, 'url')}
              >
                {copiedUrl ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Terminal Command</label>
            <div className="flex gap-2 group">
              <div className="flex-1 bg-black p-3 rounded-md font-mono text-sm truncate flex items-center gap-2 text-emerald-500 border border-emerald-500/20 select-all">
                <Terminal className="h-4 w-4 shrink-0 opacity-50" />
                <span className="truncate">{result.curl}</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                className={cn("shrink-0", copiedCurl && "text-emerald-500 border-emerald-500/50 bg-emerald-500/10")}
                onClick={() => copyToClipboard(result.curl, 'curl')}
              >
                {copiedCurl ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <Button onClick={onReset} variant="ghost" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Drop another
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
