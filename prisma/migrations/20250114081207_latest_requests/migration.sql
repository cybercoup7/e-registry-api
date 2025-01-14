-- AlterTable
ALTER TABLE `forwardedmemo` ADD COLUMN `read` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `memo` ADD COLUMN `read` BOOLEAN NOT NULL DEFAULT false;
