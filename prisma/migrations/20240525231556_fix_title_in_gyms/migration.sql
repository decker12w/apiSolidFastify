/*
  Warnings:

  - You are about to drop the column `titlte` on the `gyms` table. All the data in the column will be lost.
  - Added the required column `title` to the `gyms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gyms" DROP COLUMN "titlte",
ADD COLUMN     "title" TEXT NOT NULL;
