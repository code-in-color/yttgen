/*
  Warnings:

  - You are about to drop the column `profilePic` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "profilePic",
ADD COLUMN     "profileImage" TEXT;
