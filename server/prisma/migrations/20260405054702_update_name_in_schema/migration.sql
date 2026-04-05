/*
  Warnings:

  - You are about to drop the `ClashComments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClashComments" DROP CONSTRAINT "ClashComments_opinion_id_fkey";

-- DropTable
DROP TABLE "ClashComments";

-- CreateTable
CREATE TABLE "OpinionComments" (
    "id" SERIAL NOT NULL,
    "opinion_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "OpinionComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OpinionComments" ADD CONSTRAINT "OpinionComments_opinion_id_fkey" FOREIGN KEY ("opinion_id") REFERENCES "Opinion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
