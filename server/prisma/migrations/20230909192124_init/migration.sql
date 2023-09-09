/*
  Warnings:

  - You are about to alter the column `sortId` on the `Paragraph` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `UnsignedTinyInt`.
  - You are about to alter the column `sortId` on the `reviewBlocks` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `UnsignedTinyInt`.

*/
-- AlterTable
ALTER TABLE `Paragraph` MODIFY `sortId` TINYINT UNSIGNED NULL;

-- AlterTable
ALTER TABLE `reviewBlocks` MODIFY `sortId` TINYINT UNSIGNED NULL;
