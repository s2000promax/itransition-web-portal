/*
  Warnings:

  - You are about to drop the `hiddenList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `hiddenList` DROP FOREIGN KEY `hiddenList_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `hiddenList` DROP FOREIGN KEY `hiddenList_userId_fkey`;

-- DropTable
DROP TABLE `hiddenList`;
