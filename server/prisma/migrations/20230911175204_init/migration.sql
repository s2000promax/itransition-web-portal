/*
  Warnings:

  - You are about to drop the column `isFirstVisit` on the `Settings` table. All the data in the column will be lost.
  - Added the required column `is_first_visit` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_reviews_page_was_opened` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Settings` DROP COLUMN `isFirstVisit`,
    ADD COLUMN `is_first_visit` BOOLEAN NOT NULL,
    ADD COLUMN `is_reviews_page_was_opened` BOOLEAN NOT NULL;
