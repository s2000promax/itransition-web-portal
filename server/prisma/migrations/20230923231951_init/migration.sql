/*
  Warnings:

  - Added the required column `id` to the `aboutItemBlock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `aboutItemBlock` DROP FOREIGN KEY `aboutItemBlock_language_fkey`;

-- AlterTable
ALTER TABLE `aboutItemBlock` ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `aboutItemBlock` ADD CONSTRAINT `aboutItemBlock_id_fkey` FOREIGN KEY (`id`) REFERENCES `aboutContent`(`language`) ON DELETE CASCADE ON UPDATE CASCADE;
