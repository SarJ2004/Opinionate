/*
  Warnings:

  - You are about to drop the `OpinionComments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OpinionComments" DROP CONSTRAINT "OpinionComments_opinion_id_fkey";

-- DropTable
DROP TABLE "OpinionComments";

-- CreateTable
CREATE TABLE "OpinionComment" (
    "id" SERIAL NOT NULL,
    "opinion_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "OpinionComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OpinionComment" ADD CONSTRAINT "OpinionComment_opinion_id_fkey" FOREIGN KEY ("opinion_id") REFERENCES "Opinion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
