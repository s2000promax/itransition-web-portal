/*
  Warnings:

  - You are about to alter the column `owner_rating` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedTinyInt`.
  - You are about to alter the column `average_rating` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `view_count` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedBigInt`.
  - You are about to alter the column `likes_count` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedBigInt`.
  - You are about to alter the column `rating` on the `usersRatings` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedTinyInt`.

*/
-- AlterTable
ALTER TABLE `Paragraph` MODIFY `sortId` TEXT NULL;

-- AlterTable
ALTER TABLE `comments` MODIFY `content` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `reviewBlocks` MODIFY `sortId` TEXT NULL;

-- AlterTable
ALTER TABLE `reviews` MODIFY `title` TEXT NOT NULL,
    MODIFY `subtitle` TEXT NOT NULL,
    MODIFY `cover` VARCHAR(2048) NOT NULL,
    MODIFY `owner_rating` TINYINT UNSIGNED NOT NULL,
    MODIFY `average_rating` DOUBLE NOT NULL,
    MODIFY `view_count` BIGINT UNSIGNED NOT NULL,
    MODIFY `likes_count` BIGINT UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `avatar` VARCHAR(2048) NOT NULL;

-- AlterTable
ALTER TABLE `usersRatings` MODIFY `rating` TINYINT UNSIGNED NOT NULL,
    MODIFY `feedback` TEXT NOT NULL;
