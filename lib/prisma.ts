import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    }),
  })

// 开发环境下将实例挂载到 globalThis，防止 Next.js 热重载时创建多个实例
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
