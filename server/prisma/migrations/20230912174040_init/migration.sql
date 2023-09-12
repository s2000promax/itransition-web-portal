/*
  Warnings:

  - The primary key for the `likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `reviewId` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `average_rating` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `likes_count` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `subtitle` on the `reviews` table. All the data in the column will be lost.
  - The primary key for the `usersRatings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `reviewId` on the `usersRatings` table. All the data in the column will be lost.
  - Added the required column `workId` to the `usersRatings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `usersRatings` DROP FOREIGN KEY `usersRatings_reviewId_fkey`;

-- AlterTable
ALTER TABLE `likes` DROP PRIMARY KEY,
    DROP COLUMN `reviewId`,
    ADD PRIMARY KEY (`userId`);

-- AlterTable
ALTER TABLE `reviews` DROP COLUMN `average_rating`,
    DROP COLUMN `likes_count`,
    DROP COLUMN `subtitle`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `likes_count` BIGINT UNSIGNED NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `usersRatings` DROP PRIMARY KEY,
    DROP COLUMN `reviewId`,
    ADD COLUMN `workId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userId`, `workId`);

-- CreateTable
CREATE TABLE `Work` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `cover` VARCHAR(191) NOT NULL,
    `average_rating` DOUBLE NOT NULL,
    `reviewId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Work` ADD CONSTRAINT `Work_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `reviews`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersRatings` ADD CONSTRAINT `usersRatings_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `Work`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
