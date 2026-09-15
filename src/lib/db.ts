import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// DATABASE_URL must come from the environment. There is intentionally no
// hardcoded fallback here — a previous version of this file had the
// production database credential committed directly in source, which
// meant anyone with repository access (or anyone who ever saw this repo,
// including if it were made public) had the live database password.
if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL environment variable is not set. Copy .env.example to .env ' +
      'and fill in a real connection string before running the app.'
  )
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
