/*
  Warnings:

  - Added the required column `provider` to the `SocialAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerAccountId` to the `SocialAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SocialAccount" ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "providerAccountId" TEXT NOT NULL;
