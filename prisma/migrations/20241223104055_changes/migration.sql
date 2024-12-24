/*
  Warnings:

  - The primary key for the `file` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `file` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `memo` DROP FOREIGN KEY `Memo_FileId_fkey`;

-- DropIndex
DROP INDEX `File_id_key` ON `file`;

-- AlterTable
ALTER TABLE `file` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`fileNo`);

-- AddForeignKey
ALTER TABLE `Memo` ADD CONSTRAINT `Memo_FileId_fkey` FOREIGN KEY (`FileId`) REFERENCES `File`(`fileNo`) ON DELETE RESTRICT ON UPDATE CASCADE;
