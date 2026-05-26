import { Logo } from '@/components/logo'
import { GitHubLoginButton } from '@/components/github-login-button'
import { FeaturePills } from '@/components/feature-pills'

export function LoginCard() {
  return (
    <div className="relative w-full max-w-sm">
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl"
        style={{
          background:
            'radial-gradient(ellipse 70% 40% at 50% 0%, oklch(0.65 0.18 250 / 0.12), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-8 rounded-2xl border border-border bg-card px-8 py-10 shadow-xl">
        <header className="flex flex-col items-center gap-4 text-center">
          <Logo />
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-semibold tracking-tight text-balance text-foreground">
              收藏网页，让 AI 帮你总结
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              一键保存，AI 即时提炼要点，再也不用担心读不完的书签。
            </p>
          </div>
        </header>

        <section aria-label="登录方式" className="flex flex-col gap-4">
          <GitHubLoginButton />
          <p className="text-center text-xs text-muted-foreground leading-relaxed">
            登录即表示你同意我们的{' '}
            <a href="#" className="underline underline-offset-2 hover:text-foreground transition-colors">
              服务条款
            </a>{' '}
            与{' '}
            <a href="#" className="underline underline-offset-2 hover:text-foreground transition-colors">
              隐私政策
            </a>
          </p>
        </section>

        <FeaturePills />
      </div>
    </div>
  )
}
