-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "contentUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_fkey" FOREIGN KEY ("user") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
