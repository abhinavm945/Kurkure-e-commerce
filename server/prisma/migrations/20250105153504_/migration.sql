/*
  Warnings:

  - You are about to drop the column `userId` on the `Details` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Details_userId_key";

-- AlterTable
ALTER TABLE "Details" DROP COLUMN "userId";
