/*
  Warnings:

  - You are about to drop the `Opinion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OpinionComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OpinionItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Opinion" DROP CONSTRAINT "Opinion_user_id_fkey";

-- DropForeignKey
ALTER TABLE "OpinionComment" DROP CONSTRAINT "OpinionComment_opinion_id_fkey";

-- DropForeignKey
ALTER TABLE "OpinionItem" DROP CONSTRAINT "OpinionItem_opinion_id_fkey";

-- DropTable
DROP TABLE "Opinion";

-- DropTable
DROP TABLE "OpinionComment";

-- DropTable
DROP TABLE "OpinionItem";

-- CreateTable
CREATE TABLE "Verso" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Verso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VersoItem" (
    "id" SERIAL NOT NULL,
    "verso_id" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VersoItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VersoComment" (
    "id" SERIAL NOT NULL,
    "verso_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VersoComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Verso" ADD CONSTRAINT "Verso_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VersoItem" ADD CONSTRAINT "VersoItem_verso_id_fkey" FOREIGN KEY ("verso_id") REFERENCES "Verso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VersoComment" ADD CONSTRAINT "VersoComment_verso_id_fkey" FOREIGN KEY ("verso_id") REFERENCES "Verso"("id") ON DELETE CASCADE ON UPDATE CASCADE;
