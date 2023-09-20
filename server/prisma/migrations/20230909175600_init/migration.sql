-- AlterTable
ALTER TABLE `Paragraph` MODIFY `content` TEXT NULL;

-- AlterTable
ALTER TABLE `reviewBlocks` MODIFY `title` TEXT NULL,
    MODIFY `src` VARCHAR(2048) NULL,
    MODIFY `code` TEXT NULL;
