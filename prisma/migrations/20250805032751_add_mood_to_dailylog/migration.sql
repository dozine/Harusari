/*
  Warnings:

  - You are about to drop the `MoodEntry` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,date]` on the table `DailyLog` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "MoodEntry" DROP CONSTRAINT "MoodEntry_userId_fkey";

-- AlterTable
ALTER TABLE "DailyLog" ADD COLUMN     "mood" TEXT,
ADD COLUMN     "moodComment" TEXT;

-- DropTable
DROP TABLE "MoodEntry";

-- CreateIndex
CREATE UNIQUE INDEX "DailyLog_userId_date_key" ON "DailyLog"("userId", "date");
