-- CreateTable
CREATE TABLE `_FileToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FileToUser_AB_unique`(`A`, `B`),
    INDEX `_FileToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_FileToUser` ADD CONSTRAINT `_FileToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `File`(`fileNo`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FileToUser` ADD CONSTRAINT `_FileToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
