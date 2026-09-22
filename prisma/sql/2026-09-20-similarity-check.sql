-- ---------------------------------------------------------------------------
-- SimilarityCheck table - 2026-09-20
--
-- YOU PROBABLY DO NOT NEED TO RUN THIS.
--
-- This project does not use Prisma Migrate. There is no prisma/migrations
-- directory, and package.json's build script is:
--
--     prisma generate && prisma db push --accept-data-loss && next build
--
-- So Vercel compares prisma/schema.prisma against the live database on every
-- deploy and creates this table for you automatically. This file is kept only
-- as a record of the exact change, and for the case where you want to create
-- the table by hand (e.g. in the Neon SQL editor) before deploying.
--
-- Do NOT move this file into prisma/migrations/. Creating that directory would
-- switch Prisma into migration mode against a database whose history was built
-- with `db push`, and the first `prisma migrate` run would want to reset it.
--
-- This change is purely additive: one new table, no ALTER against any existing
-- table, so no existing data is touched. Generated with `prisma migrate diff`
-- rather than written by hand, so it matches what `db push` will do.
-- ---------------------------------------------------------------------------

-- CreateTable
CREATE TABLE "SimilarityCheck" (
    "id" TEXT NOT NULL,
    "referenceNumber" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subject" TEXT,
    "wordCount" INTEGER,
    "notes" TEXT,
    "fileName" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "fileType" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "reportFileName" TEXT,
    "reportFileSize" INTEGER,
    "reportFileType" TEXT,
    "reportFilePath" TEXT,
    "similarityScore" DOUBLE PRECISION,
    "adminNotes" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SimilarityCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SimilarityCheck_referenceNumber_key" ON "SimilarityCheck"("referenceNumber");

-- CreateIndex
CREATE INDEX "SimilarityCheck_customerId_idx" ON "SimilarityCheck"("customerId");

-- CreateIndex
CREATE INDEX "SimilarityCheck_status_idx" ON "SimilarityCheck"("status");

-- AddForeignKey
ALTER TABLE "SimilarityCheck" ADD CONSTRAINT "SimilarityCheck_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

