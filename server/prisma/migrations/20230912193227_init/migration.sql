/*
  Warnings:

  - Added the required column `workTitle` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reviews` ADD COLUMN `workTitle` TEXT NOT NULL;
