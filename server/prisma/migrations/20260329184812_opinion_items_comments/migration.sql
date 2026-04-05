-- CreateTable
CREATE TABLE "OpinionItem" (
    "id" SERIAL NOT NULL,
    "opinion_id" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OpinionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClashComments" (
    "id" SERIAL NOT NULL,
    "opinion_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "ClashComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OpinionItem" ADD CONSTRAINT "OpinionItem_opinion_id_fkey" FOREIGN KEY ("opinion_id") REFERENCES "Opinion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClashComments" ADD CONSTRAINT "ClashComments_opinion_id_fkey" FOREIGN KEY ("opinion_id") REFERENCES "Opinion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
