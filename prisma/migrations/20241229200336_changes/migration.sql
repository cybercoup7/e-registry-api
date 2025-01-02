/*
  Warnings:

  - You are about to drop the column `FileId` on the `memo` table. All the data in the column will be lost.
  - You are about to drop the column `cc` on the `memo` table. All the data in the column will be lost.
  - You are about to drop the column `forwardHistry` on the `memo` table. All the data in the column will be lost.
  - You are about to drop the column `from` on the `memo` table. All the data in the column will be lost.
  - You are about to drop the column `memoComment` on the `memo` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `memo` table. All the data in the column will be lost.
  - Added the required column `fileId` to the `Memo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `memo` DROP FOREIGN KEY `Memo_FileId_fkey`;

-- AlterTable
ALTER TABLE `memo` DROP COLUMN `FileId`,
    DROP COLUMN `cc`,
    DROP COLUMN `forwardHistry`,
    DROP COLUMN `from`,
    DROP COLUMN `memoComment`,
    DROP COLUMN `to`,
    ADD COLUMN `fileId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `ForwardedMemo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memoId` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `comment` VARCHAR(191) NULL,
    `forwardedToId` INTEGER NOT NULL,
    `forwardedById` INTEGER NOT NULL,
    `forwardedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Memo` ADD CONSTRAINT `Memo_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `File`(`fileNo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ForwardedMemo` ADD CONSTRAINT `ForwardedMemo_forwardedToId_fkey` FOREIGN KEY (`forwardedToId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ForwardedMemo` ADD CONSTRAINT `ForwardedMemo_forwardedById_fkey` FOREIGN KEY (`forwardedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ForwardedMemo` ADD CONSTRAINT `ForwardedMemo_memoId_fkey` FOREIGN KEY (`memoId`) REFERENCES `Memo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
