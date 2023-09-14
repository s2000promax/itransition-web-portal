/*
  Warnings:

  - Added the required column `author` to the `works` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `works` ADD COLUMN `author` VARCHAR(255) NOT NULL,
    ADD COLUMN `release_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
