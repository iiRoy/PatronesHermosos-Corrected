/*
  Warnings:

  - You are about to drop the column `preferred_venue` on the `collaborators` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `collaborators` DROP FOREIGN KEY `collaborators_preferred_venue_fkey`;

-- DropIndex
DROP INDEX `collaborators_preferred_venue_fkey` ON `collaborators`;

-- AlterTable
ALTER TABLE `collaborators` DROP COLUMN `preferred_venue`,
    ADD COLUMN `preferred_group` INTEGER UNSIGNED NULL;

-- AddForeignKey
ALTER TABLE `collaborators` ADD CONSTRAINT `collaborators_preferred_group_fkey` FOREIGN KEY (`preferred_group`) REFERENCES `groups`(`id_group`) ON DELETE SET NULL ON UPDATE CASCADE;
