/*
  Warnings:

  - Added the required column `postImage` to the `_post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `_post` ADD COLUMN `postImage` VARCHAR(255) NOT NULL;
