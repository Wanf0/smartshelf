const features = [
  { icon: '✦', label: 'AI 自动摘要' },
  { icon: '◈', label: '智能分类整理' },
  { icon: '◉', label: '全文语义搜索' },
]

export function FeaturePills() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2" role="list" aria-label="产品功能亮点">
      {features.map((f) => (
        <div
          key={f.label}
          role="listitem"
          className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-muted-foreground"
        >
          <span className="text-accent text-[10px]" aria-hidden="true">{f.icon}</span>
          <span>{f.label}</span>
        </div>
      ))}
    </div>
  )
}
