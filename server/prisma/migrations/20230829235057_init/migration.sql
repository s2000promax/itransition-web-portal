/*
  Warnings:

  - The primary key for the `comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `comments` table. All the data in the column will be lost.
  - The primary key for the `reviewBlocks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `reviewTags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `reviewTags` table. All the data in the column will be lost.
  - The primary key for the `reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tags` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `roles` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.
  - The required column `comment_id` was added to the `comments` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `review_tag_id` was added to the `reviewTags` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `tag_id` was added to the `tags` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `feedbar` to the `usersRatings` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `rating` on the `usersRatings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

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
ALTER TABLE `reviewTags` DROP FOREIGN KEY `reviewTags_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `reviewTags` DROP FOREIGN KEY `reviewTags_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_ownerUserId_fkey`;

-- DropForeignKey
ALTER TABLE `tokens` DROP FOREIGN KEY `tokens_userId_fkey`;

-- DropForeignKey
ALTER TABLE `userFields` DROP FOREIGN KEY `userFields_userId_fkey`;

-- DropForeignKey
ALTER TABLE `usersRatings` DROP FOREIGN KEY `usersRatings_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `usersRatings` DROP FOREIGN KEY `usersRatings_userId_fkey`;

-- AlterTable
ALTER TABLE `comments` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `comment_id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `reviewId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`comment_id`);

-- AlterTable
ALTER TABLE `hiddenList` MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `reviewId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `likes` MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `reviewId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `reviewBlocks` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `reviewId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `reviewTags` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `review_tag_id` VARCHAR(191) NOT NULL,
    MODIFY `reviewId` VARCHAR(191) NOT NULL,
    MODIFY `tagId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`review_tag_id`);

-- AlterTable
ALTER TABLE `reviews` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `ownerUserId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tags` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `tag_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`tag_id`);

-- AlterTable
ALTER TABLE `tokens` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `userFields` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `roles` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `usersRatings` ADD COLUMN `feedbar` VARCHAR(191) NOT NULL,
    DROP COLUMN `rating`,
    ADD COLUMN `rating` INTEGER NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `reviewId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userFields` ADD CONSTRAINT `userFields_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_ownerUserId_fkey` FOREIGN KEY (`ownerUserId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviewBlocks` ADD CONSTRAINT `reviewBlocks_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `reviews`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviewTags` ADD CONSTRAINT `reviewTags_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `reviews`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviewTags` ADD CONSTRAINT `reviewTags_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `tags`(`tag_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
