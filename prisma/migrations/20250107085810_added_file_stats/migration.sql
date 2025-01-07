/*
  Warnings:

  - You are about to drop the column `title` on the `memo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `memo` DROP COLUMN `title`,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'Pending';
