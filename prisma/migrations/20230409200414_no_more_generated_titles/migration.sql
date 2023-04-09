/*
  Warnings:

  - You are about to drop the `generated_titles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "generated_titles" DROP CONSTRAINT "generated_titles_user_fkey";

-- DropTable
DROP TABLE "generated_titles";

-- CreateTable
CREATE TABLE "titles" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "titles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "titles" ADD CONSTRAINT "titles_user_fkey" FOREIGN KEY ("user") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
