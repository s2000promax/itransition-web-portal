/*
  Warnings:

  - You are about to drop the column `average_rating` on the `works` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `works` DROP COLUMN `average_rating`,
    ADD COLUMN `average_reviews_rating` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `average_users_rating` DOUBLE NOT NULL DEFAULT 0;
