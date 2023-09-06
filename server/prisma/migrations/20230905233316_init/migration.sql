/*
  Warnings:

  - The primary key for the `comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `comment_id` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `paragraphs` on the `reviewBlocks` table. All the data in the column will be lost.
  - The primary key for the `reviewTags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `review_tag_id` on the `reviewTags` table. All the data in the column will be lost.
  - You are about to drop the column `averageRating` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `likesCount` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `ownerUserId` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `preview` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `viewCount` on the `reviews` table. All the data in the column will be lost.
  - The primary key for the `tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tag_id` on the `tags` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `settings` on the `users` table. All the data in the column will be lost.
  - The required column `id` was added to the `comments` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `average_rating` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes_count` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_rating` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `view_count` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Made the column `is_blocked` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_userId_fkey`;

-- DropForeignKey
ALTER TABLE `hiddenList` DROP FOREIGN KEY `hiddenList_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `hiddenList` DROP FOREIGN KEY `hiddenList_userId_fkey`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_userId_fkey`;

-- DropForeignKey
ALTER TABLE `reviewBlocks` DROP FOREIGN KEY `reviewBlocks_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `reviewTags` DROP FOREIGN KEY `reviewTags_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_ownerUserId_fkey`;

-- DropForeignKey
ALTER TABLE `tokens` DROP FOREIGN KEY `tokens_userId_fkey`;

-- DropForeignKey
ALTER TABLE `usersRatings` DROP FOREIGN KEY `usersRatings_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `usersRatings` DROP FOREIGN KEY `usersRatings_userId_fkey`;

-- AlterTable
ALTER TABLE `comments` DROP PRIMARY KEY,
    DROP COLUMN `comment_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `hiddenList` ADD PRIMARY KEY (`userId`, `reviewId`);

-- AlterTable
ALTER TABLE `likes` ADD PRIMARY KEY (`userId`, `reviewId`);

-- AlterTable
ALTER TABLE `reviewBlocks` DROP COLUMN `paragraphs`;

-- AlterTable
ALTER TABLE `reviewTags` DROP PRIMARY KEY,
    DROP COLUMN `review_tag_id`,
    ADD PRIMARY KEY (`reviewId`, `tagId`);

-- AlterTable
ALTER TABLE `reviews` DROP COLUMN `averageRating`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `likesCount`,
    DROP COLUMN `ownerUserId`,
    DROP COLUMN `preview`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `viewCount`,
    ADD COLUMN `average_rating` INTEGER NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `likes_count` INTEGER NOT NULL,
    ADD COLUMN `ownerId` VARCHAR(191) NOT NULL,
    ADD COLUMN `owner_rating` INTEGER NOT NULL,
    ADD COLUMN `type` ENUM('ALL', 'IT', 'MUSIC', 'MOVIES', 'GAMES', 'TECHOLOGY', 'STARTUPS', 'SCIENCE') NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `view_count` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tags` DROP PRIMARY KEY,
    DROP COLUMN `tag_id`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `role`,
    DROP COLUMN `settings`,
    MODIFY `is_blocked` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `usersRatings` ADD PRIMARY KEY (`userId`, `reviewId`);

-- CreateTable
CREATE TABLE `Paragraph` (
    `content` VARCHAR(191) NULL,
    `reviewBlockId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`reviewBlockId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` VARCHAR(191) NOT NULL,
    `name` ENUM('SA', 'ADMIN', 'USER') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRole` (
    `roleId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Settings` (
    `theme` VARCHAR(191) NOT NULL,
    `language` VARCHAR(191) NOT NULL,
    `isFirstVisit` BOOLEAN NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviewBlocks` ADD CONSTRAINT `reviewBlocks_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `reviews`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Paragraph` ADD CONSTRAINT `Paragraph_reviewBlockId_fkey` FOREIGN KEY (`reviewBlockId`) REFERENCES `reviewBlocks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviewTags` ADD CONSTRAINT `reviewTags_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `tags`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `reviews`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersRatings` ADD CONSTRAINT `usersRatings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersRatings` ADD CONSTRAINT `usersRatings_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `reviews`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `reviews`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hiddenList` ADD CONSTRAINT `hiddenList_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hiddenList` ADD CONSTRAINT `hiddenList_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `reviews`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Settings` ADD CONSTRAINT `Settings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
