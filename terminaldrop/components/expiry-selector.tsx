'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TTL_OPTIONS } from "@/lib/constants"
import { Label } from "@/components/ui/label"

interface ExpirySelectorProps {
  value: string
  onChange: (value: string) => void
}

export function ExpirySelector({ value, onChange }: ExpirySelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="ttl" className="text-sm font-medium text-muted-foreground">Expires in</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="ttl" className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select expiry" />
        </SelectTrigger>
        <SelectContent>
          {TTL_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
