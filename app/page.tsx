import { LoginCard } from '@/components/login-card'

export default function LoginPage() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background px-4 py-16">
      {/* 网格背景纹理 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(oklch(0.95 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.95 0 0) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* 顶部柔光晕 */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-96 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(ellipse, oklch(0.65 0.18 250 / 0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* 登录卡片 */}
      <LoginCard />

      {/* 页脚 */}
      <footer className="mt-10 flex flex-col items-center gap-1.5 text-center">
        <p className="text-xs text-muted-foreground">
          由{' '}
          <span className="text-accent font-medium">AI</span>{' '}
          驱动 · 为知识整理而生
        </p>
        <p className="text-xs text-muted-foreground opacity-50">
          © {new Date().getFullYear()} SmartShelf. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
