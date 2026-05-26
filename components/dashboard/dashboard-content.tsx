'use client'

import { useState } from 'react'
import { Navbar } from '@/components/dashboard/navbar'
import { AddLinkDialog } from '@/components/dashboard/add-link-dialog'
import { LinkCard, type LinkItem } from '@/components/dashboard/link-card'
import { EmptyState } from '@/components/dashboard/empty-state'
import { Bookmark } from 'lucide-react'

const initialLinks: LinkItem[] = [
  {
    id: '1',
    title: 'React 19 新特性详解：Actions、Suspense 与全新 Hooks',
    url: 'https://react.dev/blog/2024/04/25/react-19',
    domain: 'react.dev',
    summary:
      'React 19 引入了 Actions 简化异步操作、改进的 Suspense 支持服务端组件、以及 use() 等新 Hooks，显著提升开发体验和应用性能。',
    createdAt: new Date('2024-12-15'),
    hasSummary: true,
  },
  {
    id: '2',
    title: 'Tailwind CSS v4.0 正式发布：更快、更小、更强大',
    url: 'https://tailwindcss.com/blog/tailwindcss-v4',
    domain: 'tailwindcss.com',
    summary:
      'Tailwind CSS v4 带来全新的 Oxide 引擎，构建速度提升 10 倍，支持原生 CSS 嵌套和 @layer，配置更简洁直观。',
    createdAt: new Date('2024-12-10'),
    hasSummary: true,
  },
  {
    id: '3',
    title: '深入理解 JavaScript 的事件循环机制',
    url: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Event_loop',
    domain: 'developer.mozilla.org',
    createdAt: new Date('2024-12-08'),
    hasSummary: false,
  },
  {
    id: '4',
    title: '2024 年最值得关注的 10 个 AI 工具',
    url: 'https://www.producthunt.com/posts/ai-tools-2024',
    domain: 'producthunt.com',
    summary:
      '本文精选了 2024 年最具影响力的 AI 工具，涵盖代码助手、设计工具、写作辅助等多个领域，助你提升工作效率。',
    createdAt: new Date('2024-12-05'),
    hasSummary: true,
  },
]

interface DashboardContentProps {
  user?: {
    name: string
    email: string
    image?: string
  }
}

export function DashboardContent({ user }: DashboardContentProps) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks)

  const handleAddLink = (data: { url: string; title: string; tags: string[] }) => {
    const domain = new URL(data.url).hostname.replace('www.', '')
    const newLink: LinkItem = {
      id: Date.now().toString(),
      title: data.title,
      url: data.url,
      domain,
      createdAt: new Date(),
      hasSummary: false,
      tags: data.tags,
    }
    setLinks((prev) => [newLink, ...prev])
  }

  const handleGenerateSummary = (id: string) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === id
          ? {
              ...link,
              hasSummary: true,
              summary:
                '这是 AI 自动生成的摘要内容，概括了文章的主要观点和核心信息，帮助你快速了解收藏内容的价值。',
            }
          : link
      )
    )
  }

  const handleDelete = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id))
  }

  const navbarUser = user
    ? { name: user.name, email: user.email, avatar: user.image }
    : undefined

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={navbarUser} />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground">
              <Bookmark className="h-6 w-6 text-accent" />
              我的收藏
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              共 {links.length} 个收藏 · {links.filter((l) => l.hasSummary).length} 个已生成摘要
            </p>
          </div>
          <AddLinkDialog onAdd={handleAddLink} />
        </div>

        {links.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {links.map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                onGenerateSummary={handleGenerateSummary}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="mt-auto border-t border-border bg-background/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-xs text-muted-foreground sm:px-6">
          <span>© 2024 SmartShelf. All rights reserved.</span>
          <span>
            由 <span className="text-accent font-medium">AI</span> 驱动
          </span>
        </div>
      </footer>
    </div>
  )
}
