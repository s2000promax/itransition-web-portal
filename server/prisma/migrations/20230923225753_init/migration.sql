-- AlterTable
ALTER TABLE `aboutContent` MODIFY `header` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `aboutItemBlock` MODIFY `blockHeader` TEXT NOT NULL,
    MODIFY `blockFirstSrc` VARCHAR(2048) NOT NULL,
    MODIFY `blockSecongSrc` VARCHAR(2048) NOT NULL,
    MODIFY `paragraph` TEXT NOT NULL;
