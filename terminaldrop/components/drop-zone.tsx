'use client'

import { useState, useRef, useCallback } from 'react'
import { Card } from "@/components/ui/card"
import { Upload, X, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DropZoneProps {
  onFileSelect: (file: File) => void
  selectedFile: File | null
  onClear: () => void
  disabled?: boolean
  isActive?: boolean
}

export function DropZone({ onFileSelect, selectedFile, onClear, disabled, isActive }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) setIsDragging(true)
  }, [disabled])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (disabled && !isActive) {
        // If disabled because another mode is active, maybe allow drop to switch mode?
        // But prompt says "Mutual Exclusivity with gentle Override".
        // "Wenn User Text eingibt und dann eine Datei auswählt -> Text wird ausgegraut/disabled, Datei hat Priorität"
        // So drop should always work and switch mode.
        // So `disabled` prop on DropZone might mean "uploading" state, not "mode mismatch".
        // Mode mismatch is handled by parent clearing text.
        // So `disabled` should be false unless submitting.
    }

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0])
      e.dataTransfer.clearData()
    }
  }, [disabled, isActive, onFileSelect])

  const handleClick = () => {
    if (!selectedFile) {
      fileInputRef.current?.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0])
    }
    e.target.value = ''
  }

  return (
    <Card
      className={cn(
        "relative flex flex-col items-center justify-center border-2 border-dashed p-6 transition-all duration-200 ease-in-out min-h-[160px]",
        isDragging && "border-primary bg-primary/5",
        isActive && !selectedFile && "border-primary/50",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && !selectedFile && "cursor-pointer hover:border-primary/50 hover:bg-muted/50",
        selectedFile && "border-primary bg-primary/10"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={!disabled ? handleClick : undefined}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled}
      />

      {selectedFile ? (
        <div className="flex flex-col items-center gap-2 text-center w-full animate-in fade-in zoom-in duration-300">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
             <FileText className="h-6 w-6" />
          </div>
          <div className="flex flex-col max-w-full px-4">
            <span className="font-medium truncate w-full max-w-[200px] sm:max-w-[300px]" title={selectedFile.name}>
                {selectedFile.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              onClear()
            }}
            disabled={disabled}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-muted-foreground pointer-events-none">
          <Upload className={cn("h-8 w-8 transition-colors", isDragging ? "text-primary" : "text-muted-foreground/50")} />
          <div className="text-sm font-medium">
             Drop file or click
          </div>
          <div className="text-xs text-muted-foreground/70">
            Up to 50MB
          </div>
        </div>
      )}
    </Card>
  )
}
