/*
  Warnings:

  - You are about to drop the column `rating` on the `notes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "books" ADD COLUMN     "rating" INTEGER;

-- AlterTable
ALTER TABLE "notes" DROP COLUMN "rating";
