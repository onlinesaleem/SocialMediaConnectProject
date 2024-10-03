/*
  Warnings:

  - The `status` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[providerAccountId]` on the table `SocialAccount` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `Interaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `platform` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `platform` on the `SocialAccount` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `provider` on the `SocialAccount` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'PAST_DUE', 'CANCELED', 'UNPAID');

-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('BASIC', 'PRO', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('TWITTER', 'LINKEDIN', 'FACEBOOK', 'INSTAGRAM');

-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('TWITTER', 'LINKEDIN', 'FACEBOOK', 'INSTAGRAM');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('SCHEDULED', 'POSTED', 'FAILED');

-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('LIKE', 'COMMENT', 'SHARE');

-- AlterTable
ALTER TABLE "Interaction" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
DROP COLUMN "type",
ADD COLUMN     "type" "InteractionType" NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "platform" "Platform" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'SCHEDULED';

-- AlterTable
ALTER TABLE "SocialAccount" ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "refreshToken" TEXT,
DROP COLUMN "platform",
ADD COLUMN     "platform" "Platform" NOT NULL,
DROP COLUMN "provider",
ADD COLUMN     "provider" "Provider" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "subscriptionId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "stripeSubscriptionId" TEXT NOT NULL,
    "status" "SubscriptionStatus" NOT NULL,
    "plan" "Plan" NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_stripeSubscriptionId_key" ON "Subscription"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "Post_scheduledAt_status_idx" ON "Post"("scheduledAt", "status");

-- CreateIndex
CREATE UNIQUE INDEX "SocialAccount_providerAccountId_key" ON "SocialAccount"("providerAccountId");

-- CreateIndex
CREATE INDEX "SocialAccount_provider_providerAccountId_idx" ON "SocialAccount"("provider", "providerAccountId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
