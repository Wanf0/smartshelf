'use client'

import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Plus, Link as LinkIcon, Search, X, Check, FileText, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AddLinkDialogProps {
  onAdd?: (data: { url: string; title: string; tags: string[] }) => void
}

const mockFetchTitle = async (url: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  const titles: Record<string, string> = {
    'github.com': "GitHub: Let's build from here",
    'vercel.com': 'Vercel: Develop. Preview. Ship.',
    'nextjs.org': 'Next.js by Vercel - The React Framework',
    'tailwindcss.com': 'Tailwind CSS - Rapidly build modern websites',
    'react.dev': 'React – The library for web and native user interfaces',
  }
  try {
    const domain = new URL(url).hostname.replace('www.', '')
    return titles[domain] || `${domain} - 网页标题`
  } catch {
    return '网页标题'
  }
}

export function AddLinkDialog({ onAdd }: AddLinkDialogProps) {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)
  const tagInputRef = useRef<HTMLInputElement>(null)

  const resetForm = useCallback(() => {
    setUrl('')
    setTitle('')
    setTags([])
    setTagInput('')
    setHasFetched(false)
    setShowSuccess(false)
  }, [])

  const handleFetch = async () => {
    if (!url.trim()) return
    setIsFetching(true)
    try {
      const fetchedTitle = await mockFetchTitle(url)
      setTitle(fetchedTitle)
      setHasFetched(true)
    } catch {
      setTitle('无法获取标题')
    } finally {
      setIsFetching(false)
    }
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const newTag = tagInput.trim()
      if (newTag && !tags.includes(newTag) && tags.length < 5) {
        setTags([...tags, newTag])
        setTagInput('')
      }
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSave = async () => {
    if (!url.trim() || !title) return
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 600))
    onAdd?.({ url, title, tags })
    setIsSaving(false)
    setShowSuccess(true)

    setTimeout(() => {
      setOpen(false)
      resetForm()
    }, 1500)
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      resetForm()
    }
  }

  const isValidUrl = (string: string) => {
    try {
      new URL(string)
      return true
    } catch {
      return false
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
          <Plus className="h-4 w-4" />
          添加新链接
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>添加新收藏</DialogTitle>
          <DialogDescription>
            粘贴网页链接，抓取标题后添加标签并保存
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="url" className="flex items-center gap-2 text-sm font-medium">
              <LinkIcon className="h-3.5 w-3.5 text-muted-foreground" />
              网页地址
            </Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com/article"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value)
                    if (hasFetched) {
                      setHasFetched(false)
                      setTitle('')
                    }
                  }}
                  className={cn(
                    'pr-10 transition-all duration-200',
                    hasFetched && 'border-green-500/50 bg-green-500/5'
                  )}
                />
                {hasFetched && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleFetch}
                disabled={!url.trim() || !isValidUrl(url) || isFetching}
                className="gap-2 min-w-[80px]"
              >
                {isFetching ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    抓取
                  </>
                )}
              </Button>
            </div>
          </div>

          <div
            className={cn(
              'flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-out',
              hasFetched ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <Label className="flex items-center gap-2 text-sm font-medium">
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              网页标题
            </Label>
            <div className="rounded-md border border-border/50 bg-muted/30 px-3 py-2.5">
              <p className="text-sm text-foreground">{title}</p>
            </div>
          </div>

          <div
            className={cn(
              'flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-out delay-100',
              hasFetched ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <Label htmlFor="tags" className="flex items-center gap-2 text-sm font-medium">
              <Tag className="h-3.5 w-3.5 text-muted-foreground" />
              添加标签
              <span className="text-xs text-muted-foreground font-normal">(可选，最多5个)</span>
            </Label>
            <Input
              ref={tagInputRef}
              id="tags"
              type="text"
              placeholder="输入标签后按回车添加"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              disabled={tags.length >= 5}
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="gap-1 pr-1 transition-all duration-200 hover:bg-secondary/80"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 rounded-full p-0.5 hover:bg-background/50 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div
            className={cn(
              'flex items-center gap-2 transition-all duration-300',
              showSuccess ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
            )}
          >
            <div className="flex items-center justify-center h-5 w-5 rounded-full bg-green-500/20">
              <Check className="h-3 w-3 text-green-500" />
            </div>
            <span className="text-sm font-medium text-green-500">添加成功！</span>
          </div>

          <div className="flex gap-2 ml-auto">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSaving || showSuccess}
            >
              取消
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={!hasFetched || isSaving || showSuccess}
              className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 min-w-[100px]"
            >
              {isSaving ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  保存中...
                </>
              ) : showSuccess ? (
                <>
                  <Check className="h-4 w-4" />
                  已保存
                </>
              ) : (
                '保存收藏'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
