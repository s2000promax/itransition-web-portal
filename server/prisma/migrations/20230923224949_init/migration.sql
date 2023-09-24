-- CreateTable
CREATE TABLE `aboutContent` (
    `language` VARCHAR(191) NOT NULL,
    `app_name` VARCHAR(191) NOT NULL,
    `header` VARCHAR(191) NOT NULL,
    `header_description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `aboutContent_language_key`(`language`),
    PRIMARY KEY (`language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aboutItemBlock` (
    `language` VARCHAR(191) NOT NULL,
    `blockHeader` VARCHAR(191) NOT NULL,
    `blockFirstSrc` VARCHAR(191) NOT NULL,
    `blockSecongSrc` VARCHAR(191) NOT NULL,
    `paragraph` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `aboutItemBlock_language_key`(`language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `aboutItemBlock` ADD CONSTRAINT `aboutItemBlock_language_fkey` FOREIGN KEY (`language`) REFERENCES `aboutContent`(`language`) ON DELETE CASCADE ON UPDATE CASCADE;
