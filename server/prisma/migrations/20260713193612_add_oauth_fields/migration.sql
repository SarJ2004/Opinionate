-- AlterTable
ALTER TABLE "User" ADD COLUMN     "oauth_id" TEXT,
ADD COLUMN     "provider" TEXT NOT NULL DEFAULT 'credentials',
ALTER COLUMN "password" DROP NOT NULL;
