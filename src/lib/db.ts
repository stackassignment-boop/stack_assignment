import { PrismaClient } from '@prisma/client'

// Ensure we use the Neon database URL
const NEON_DATABASE_URL = "postgresql://neondb_owner:npg_A8kgUBsheXJ3@ep-floral-sun-aikg04vz-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

// Override system DATABASE_URL if it's pointing to SQLite
if (process.env.DATABASE_URL?.startsWith('file:')) {
  process.env.DATABASE_URL = NEON_DATABASE_URL
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
