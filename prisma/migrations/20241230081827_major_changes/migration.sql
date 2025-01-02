/*
  Warnings:

  - You are about to drop the column `forwardedTo` on the `memo` table. All the data in the column will be lost.
  - You are about to drop the column `ufs` on the `memo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `memo` DROP COLUMN `forwardedTo`,
    DROP COLUMN `ufs`;
