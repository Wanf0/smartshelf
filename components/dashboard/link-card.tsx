'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Trash2, ExternalLink, Globe } from 'lucide-react'

export interface LinkItem {
  id: string
  title: string
  url: string
  domain: string
  summary?: string
  createdAt: Date
  hasSummary: boolean
  tags?: string[]
}

interface LinkCardProps {
  link: LinkItem
  onGenerateSummary?: (id: string) => void
  onDelete?: (id: string) => void
}

export function LinkCard({ link, onGenerateSummary, onDelete }: LinkCardProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleGenerateSummary = async () => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    onGenerateSummary?.(link.id)
    setIsGenerating(false)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    onDelete?.(link.id)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  return (
    <article className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-2"
          >
            <h3 className="truncate text-base font-semibold text-foreground group-hover/link:text-accent transition-colors">
              {link.title}
            </h3>
            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/link:opacity-100" />
          </a>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Globe className="h-3 w-3" />
            <span>{link.domain}</span>
          </div>
          {link.tags && link.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {link.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-[10px] px-1.5 py-0 h-5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="min-h-[2.5rem]">
        {link.hasSummary && link.summary ? (
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {link.summary}
          </p>
        ) : (
          <p className="text-sm italic text-muted-foreground/60">
            暂无摘要，点击下方按钮生成
          </p>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <time className="text-xs text-muted-foreground" dateTime={link.createdAt.toISOString()}>
          {formatDate(link.createdAt)}
        </time>

        <div className="flex items-center gap-1">
          {!link.hasSummary && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleGenerateSummary}
              disabled={isGenerating}
              className="h-8 gap-1.5 text-xs text-accent hover:text-accent hover:bg-accent/10"
            >
              {isGenerating ? (
                <>
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                  生成中...
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  生成摘要
                </>
              )}
            </Button>
          )}
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={handleDelete}
            disabled={isDeleting}
            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            aria-label="删除此收藏"
          >
            {isDeleting ? (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </article>
  )
}
