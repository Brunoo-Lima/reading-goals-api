/*
  Warnings:

  - Added the required column `securityKey` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "securityKey" VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE INDEX "password_resets_user_id_idx" ON "password_resets"("user_id");
