-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "GoalsType" ADD VALUE 'TOTAL_PAGES';
ALTER TYPE "GoalsType" ADD VALUE 'SPECIFIC_BOOK';

-- AlterTable
ALTER TABLE "goals" ADD COLUMN     "book_id" TEXT,
ADD COLUMN     "current_value" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "goal_progress" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "note" TEXT,
    "logged_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "goal_id" TEXT NOT NULL,

    CONSTRAINT "goal_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "goal_progress_goal_id_idx" ON "goal_progress"("goal_id");

-- CreateIndex
CREATE INDEX "goal_progress_goal_id_logged_at_idx" ON "goal_progress"("goal_id", "logged_at");

-- CreateIndex
CREATE INDEX "goals_user_id_is_active_idx" ON "goals"("user_id", "is_active");

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goal_progress" ADD CONSTRAINT "goal_progress_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
