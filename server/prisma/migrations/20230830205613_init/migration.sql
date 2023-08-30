/*
  Warnings:

  - You are about to drop the column `feedbar` on the `usersRatings` table. All the data in the column will be lost.
  - Added the required column `feedback` to the `usersRatings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usersRatings` DROP COLUMN `feedbar`,
    ADD COLUMN `feedback` VARCHAR(191) NOT NULL;
