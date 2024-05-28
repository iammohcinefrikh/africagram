/*
  Warnings:

  - You are about to drop the column `profileId` on the `_user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `_user` DROP FOREIGN KEY `_user_ibfk_1`;

-- AlterTable
ALTER TABLE `_user` DROP COLUMN `profileId`;
