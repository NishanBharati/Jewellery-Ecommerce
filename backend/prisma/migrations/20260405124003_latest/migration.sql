/*
  Warnings:

  - You are about to drop the column `coverImage` on the `Blog` table. All the data in the column will be lost.
  - The `refreshToken` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "coverImage",
ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "refreshToken",
ADD COLUMN     "refreshToken" TEXT[];
