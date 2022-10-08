/*
  Warnings:

  - The primary key for the `Stories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Stories` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - A unique constraint covering the columns `[story]` on the table `Stories` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Stories" DROP CONSTRAINT "Stories_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(30),
ADD CONSTRAINT "Stories_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Stories_story_key" ON "Stories"("story");
