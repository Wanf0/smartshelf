import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { BookmarkPlus } from 'lucide-react'

export function EmptyState() {
  return (
    <Empty className="border border-dashed border-border bg-card/50 py-16 md:py-24">
      <EmptyHeader>
        <EmptyMedia className="bg-accent/10 text-accent">
          <BookmarkPlus className="h-6 w-6" />
        </EmptyMedia>
        <EmptyTitle>还没有收藏</EmptyTitle>
        <EmptyDescription>
          点击上方「添加新链接」按钮，开始收藏你喜欢的网页吧！
          <br />
          AI 将帮你自动生成摘要，让信息一目了然。
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
