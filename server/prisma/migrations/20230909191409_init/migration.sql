/*
  Warnings:

  - You are about to alter the column `sortId` on the `Paragraph` table. The data in that column could be lost. The data in that column will be cast from `Text` to `UnsignedInt`.
  - You are about to alter the column `sortId` on the `reviewBlocks` table. The data in that column could be lost. The data in that column will be cast from `Text` to `UnsignedInt`.

*/
-- AlterTable
ALTER TABLE `Paragraph` MODIFY `sortId` INTEGER UNSIGNED NULL;

-- AlterTable
ALTER TABLE `reviewBlocks` MODIFY `sortId` INTEGER UNSIGNED NULL;
