-- CreateTable
CREATE TABLE "generated_titles" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "generated_titles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "generated_titles" ADD CONSTRAINT "generated_titles_user_fkey" FOREIGN KEY ("user") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
