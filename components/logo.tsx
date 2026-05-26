export function Logo() {
  return (
    <div className="flex items-center gap-2.5" aria-label="SmartShelf 标志">
      {/* 书架 + AI 火花图标 */}
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary shadow-sm">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* 书架底座 */}
          <rect x="2" y="14" width="16" height="2" rx="1" fill="currentColor" className="text-foreground" />
          {/* 书本1 */}
          <rect x="3" y="7" width="3.5" height="7" rx="0.5" fill="currentColor" className="text-accent" />
          {/* 书本2 */}
          <rect x="7.5" y="5" width="3" height="9" rx="0.5" fill="currentColor" className="text-muted-foreground" />
          {/* 书本3 */}
          <rect x="11.5" y="8" width="3" height="6" rx="0.5" fill="currentColor" className="text-muted-foreground opacity-60" />
          {/* AI 火花 */}
          <circle cx="15.5" cy="4.5" r="1" fill="currentColor" className="text-accent" />
          <path
            d="M15.5 2.5 L15.5 3.5 M15.5 5.5 L15.5 6.5 M13.5 4.5 L14.5 4.5 M16.5 4.5 L17.5 4.5"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
            className="text-accent"
          />
        </svg>
      </div>
      <span className="text-xl font-semibold tracking-tight text-foreground">
        SmartShelf
      </span>
    </div>
  )
}
