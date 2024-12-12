/*
  Warnings:

  - The primary key for the `file` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `departmentId` on table `file` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `file` DROP FOREIGN KEY `File_departmentId_fkey`;

-- DropForeignKey
ALTER TABLE `memo` DROP FOREIGN KEY `Memo_FileId_fkey`;

-- AlterTable
ALTER TABLE `file` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `departmentId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `memo` MODIFY `FileId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Memo` ADD CONSTRAINT `Memo_FileId_fkey` FOREIGN KEY (`FileId`) REFERENCES `File`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
