/*
  Warnings:

  - You are about to drop the column `likes_count` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Work` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workId` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Work` DROP FOREIGN KEY `Work_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `usersRatings` DROP FOREIGN KEY `usersRatings_workId_fkey`;

-- AlterTable
ALTER TABLE `reviews` ADD COLUMN `workId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `likes_count`,
    ADD COLUMN `likes_counter` BIGINT UNSIGNED NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `Work`;

-- CreateTable
CREATE TABLE `works` (
    `id` VARCHAR(191) NOT NULL,
    `title` TEXT NOT NULL,
    `cover` VARCHAR(2048) NOT NULL,
    `description` TEXT NOT NULL,
    `type` ENUM('ALL', 'IT', 'MUSIC', 'MOVIES', 'GAMES', 'TECHOLOGY', 'STARTUPS', 'SCIENCE') NOT NULL DEFAULT 'ALL',
    `average_rating` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `works`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersRatings` ADD CONSTRAINT `usersRatings_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `works`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
