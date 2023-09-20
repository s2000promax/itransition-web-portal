/*
  Warnings:

  - Made the column `sortId` on table `Paragraph` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sortId` on table `reviewBlocks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Paragraph` MODIFY `sortId` TINYINT UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `reviewBlocks` MODIFY `sortId` TINYINT UNSIGNED NOT NULL;
