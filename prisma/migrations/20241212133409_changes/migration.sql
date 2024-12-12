-- DropForeignKey
ALTER TABLE `file` DROP FOREIGN KEY `File_departmentId_fkey`;

-- AlterTable
ALTER TABLE `file` MODIFY `departmentId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
