import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { DashboardContent } from '@/components/dashboard/dashboard-content'

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/')
  }

  const user = session.user

  return <DashboardContent
    user={{
      name: user.name ?? '用户',
      email: user.email ?? '',
      image: user.image ?? undefined,
    }}
  />
}
