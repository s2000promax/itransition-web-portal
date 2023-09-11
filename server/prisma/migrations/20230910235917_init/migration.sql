/*
  Warnings:

  - You are about to drop the column `rating` on the `usersRatings` table. All the data in the column will be lost.
  - Added the required column `rate` to the `usersRatings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usersRatings` DROP COLUMN `rating`,
    ADD COLUMN `rate` TINYINT UNSIGNED NOT NULL;
