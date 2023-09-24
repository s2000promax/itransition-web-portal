/*
  Warnings:

  - You are about to drop the column `blockSecongSrc` on the `aboutItemBlock` table. All the data in the column will be lost.
  - Added the required column `blockSecondSrc` to the `aboutItemBlock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `aboutItemBlock` DROP FOREIGN KEY `aboutItemBlock_id_fkey`;

-- DropIndex
DROP INDEX `aboutItemBlock_language_key` ON `aboutItemBlock`;

-- AlterTable
ALTER TABLE `aboutItemBlock` DROP COLUMN `blockSecongSrc`,
    ADD COLUMN `blockSecondSrc` VARCHAR(2048) NOT NULL;

-- AddForeignKey
ALTER TABLE `aboutItemBlock` ADD CONSTRAINT `aboutItemBlock_language_fkey` FOREIGN KEY (`language`) REFERENCES `aboutContent`(`language`) ON DELETE CASCADE ON UPDATE CASCADE;
