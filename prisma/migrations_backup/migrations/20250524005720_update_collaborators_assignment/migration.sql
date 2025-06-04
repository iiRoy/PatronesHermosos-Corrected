/*
  Warnings:

  - You are about to drop the column `preferred_group` on the `collaborators` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `collaborators` DROP FOREIGN KEY `collaborators_preferred_group_fkey`;

-- DropIndex
DROP INDEX `collaborators_preferred_group_fkey` ON `collaborators`;

-- AlterTable
ALTER TABLE `collaborators` DROP COLUMN `preferred_group`,
    ADD COLUMN `preferred_venue` INTEGER UNSIGNED NULL;

-- CreateIndex
CREATE INDEX `collaborators_preferred_venue_fkey` ON `collaborators`(`preferred_venue`);

-- AddForeignKey
ALTER TABLE `collaborators` ADD CONSTRAINT `collaborators_preferred_venue_fkey` FOREIGN KEY (`preferred_venue`) REFERENCES `venues`(`id_venue`) ON DELETE SET NULL ON UPDATE CASCADE;
