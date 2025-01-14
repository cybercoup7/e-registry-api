/*
  Warnings:

  - You are about to drop the column `upDatedAt` on the `memo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `memo` DROP FOREIGN KEY `Memo_fileId_fkey`;

-- DropForeignKey
ALTER TABLE `memo` DROP FOREIGN KEY `Memo_to_fkey`;

-- DropIndex
DROP INDEX `Memo_fileId_fkey` ON `memo`;

-- DropIndex
DROP INDEX `Memo_to_fkey` ON `memo`;

-- AlterTable
ALTER TABLE `memo` DROP COLUMN `upDatedAt`,
    ADD COLUMN `isDraft` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `body` VARCHAR(191) NULL,
    MODIFY `fileId` VARCHAR(191) NULL,
    MODIFY `to` INTEGER NULL;

-- CreateIndex
CREATE INDEX `Memo_status_isDraft_idx` ON `Memo`(`status`, `isDraft`);

-- AddForeignKey
ALTER TABLE `Memo` ADD CONSTRAINT `Memo_to_fkey` FOREIGN KEY (`to`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Memo` ADD CONSTRAINT `Memo_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `File`(`fileNo`) ON DELETE SET NULL ON UPDATE CASCADE;
