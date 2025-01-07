/*
  Warnings:

  - Added the required column `from` to the `Memo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `Memo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `memo` ADD COLUMN `from` INTEGER NOT NULL,
    ADD COLUMN `to` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Memo` ADD CONSTRAINT `Memo_from_fkey` FOREIGN KEY (`from`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Memo` ADD CONSTRAINT `Memo_to_fkey` FOREIGN KEY (`to`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
