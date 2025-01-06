-- DropForeignKey
ALTER TABLE "Details" DROP CONSTRAINT "Details_userId_fkey";

-- AlterTable
ALTER TABLE "Details" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Details" ADD CONSTRAINT "Details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("username") ON DELETE CASCADE ON UPDATE CASCADE;
