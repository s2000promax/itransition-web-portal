/*
  Warnings:

  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HiddenList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReviewBlock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReviewTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFields` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersRating` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `HiddenList` DROP FOREIGN KEY `HiddenList_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `HiddenList` DROP FOREIGN KEY `HiddenList_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Like` DROP FOREIGN KEY `Like_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `Like` DROP FOREIGN KEY `Like_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ReviewBlock` DROP FOREIGN KEY `ReviewBlock_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `ReviewTag` DROP FOREIGN KEY `ReviewTag_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `ReviewTag` DROP FOREIGN KEY `ReviewTag_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `UserFields` DROP FOREIGN KEY `UserFields_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UsersRating` DROP FOREIGN KEY `UsersRating_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `UsersRating` DROP FOREIGN KEY `UsersRating_userId_fkey`;

-- DropTable
DROP TABLE `Comment`;

-- DropTable
DROP TABLE `HiddenList`;

-- DropTable
DROP TABLE `Like`;

-- DropTable
DROP TABLE `ReviewBlock`;

-- DropTable
DROP TABLE `ReviewTag`;

-- DropTable
DROP TABLE `Tag`;

-- DropTable
DROP TABLE `UserFields`;

-- DropTable
DROP TABLE `UsersRating`;

-- CreateTable
CREATE TABLE `userFields` (
    `userId` BIGINT NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `userFields_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviewBlocks` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `reviewId` BIGINT NOT NULL,
    `type` ENUM('TEXT', 'IMAGE', 'CODE') NOT NULL,
    `title` VARCHAR(191) NULL,
    `src` VARCHAR(191) NULL,
    `paragraphs` VARCHAR(191) NULL,
    `code` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviewTags` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `reviewId` BIGINT NOT NULL,
    `tagId` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tags_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `likes` (
    `userId` BIGINT NOT NULL,
    `reviewId` BIGINT NOT NULL,

    UNIQUE INDEX `likes_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usersRatings` (
    `rating` LONGBLOB NOT NULL,
    `userId` BIGINT NOT NULL,
    `reviewId` BIGINT NOT NULL,

    UNIQUE INDEX `usersRatings_reviewId_key`(`reviewId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `userId` BIGINT NOT NULL,
    `reviewId` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hiddenList` (
    `userId` BIGINT NOT NULL,
    `reviewId` BIGINT NOT NULL,

    UNIQUE INDEX `hiddenList_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `userFields` ADD CONSTRAINT `userFields_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviewBlocks` ADD CONSTRAINT `reviewBlocks_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `reviews`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviewTags` ADD CONSTRAINT `reviewTags_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `reviews`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviewTags` ADD CONSTRAINT `reviewTags_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `reviews`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersRatings` ADD CONSTRAINT `usersRatings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersRatings` ADD CONSTRAINT `usersRatings_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `reviews`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `reviews`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hiddenList` ADD CONSTRAINT `hiddenList_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hiddenList` ADD CONSTRAINT `hiddenList_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `reviews`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
