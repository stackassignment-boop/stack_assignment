import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Check if DATABASE_URL is available
const hasDatabaseUrl = !!process.env.DATABASE_URL

// Only initialize Prisma client if DATABASE_URL is available
export const db = hasDatabaseUrl
  ? (globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV !== 'production' ? ['query', 'error', 'warn'] : ['error'],
    }))
  : null

// Cache the client globally to avoid multiple instances in development
if (hasDatabaseUrl && process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db as PrismaClient
}