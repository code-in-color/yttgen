/*
  Warnings:

  - Made the column `handle` on table `profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "handle" SET NOT NULL;
