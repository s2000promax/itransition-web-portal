/*
  Warnings:

  - You are about to drop the `Paragraph` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Paragraph` DROP FOREIGN KEY `Paragraph_reviewBlockId_fkey`;

-- DropTable
DROP TABLE `Paragraph`;

-- CreateTable
CREATE TABLE `paragraphs` (
    `id` VARCHAR(191) NOT NULL,
    `reviewBlockId` VARCHAR(191) NOT NULL,
    `sortId` TINYINT UNSIGNED NOT NULL,
    `content` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `paragraphs` ADD CONSTRAINT `paragraphs_reviewBlockId_fkey` FOREIGN KEY (`reviewBlockId`) REFERENCES `reviewBlocks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
