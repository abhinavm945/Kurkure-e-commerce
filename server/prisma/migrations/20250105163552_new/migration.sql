/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Details` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Details" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DATA TYPE DECIMAL;

-- CreateIndex
CREATE UNIQUE INDEX "Details_userId_key" ON "Details"("userId");

-- AddForeignKey
ALTER TABLE "Details" ADD CONSTRAINT "Details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
