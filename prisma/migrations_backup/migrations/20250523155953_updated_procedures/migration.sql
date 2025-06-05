/*
  Warnings:

  - The values [Básico] on the enum `collaborators_level` will be removed. If these variants are still used in the database, this will fail.
  - The values [Inglés,Español] on the enum `collaborators_language` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `status` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the column `maternal_name` on the `superusers` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `superusers` table. All the data in the column will be lost.
  - You are about to drop the column `paternal_name` on the `superusers` table. All the data in the column will be lost.
  - You are about to drop the column `profile_image` on the `superusers` table. All the data in the column will be lost.
  - You are about to drop the column `tokenVersion` on the `superusers` table. All the data in the column will be lost.
  - You are about to drop the column `tokenVersion` on the `venue_coordinators` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `venues` table. All the data in the column will be lost.
  - Made the column `country` on table `venues` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `venues` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `collaborators` MODIFY `level` ENUM('Pendiente', 'Avanzado') NOT NULL DEFAULT 'Pendiente',
    MODIFY `language` ENUM('Pendiente') NOT NULL DEFAULT 'Pendiente';

-- AlterTable
ALTER TABLE `groups` DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `participants` ADD COLUMN `participation_file_path` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `superusers` DROP COLUMN `maternal_name`,
    DROP COLUMN `name`,
    DROP COLUMN `paternal_name`,
    DROP COLUMN `profile_image`,
    DROP COLUMN `tokenVersion`;

-- AlterTable
ALTER TABLE `venue_coordinators` DROP COLUMN `tokenVersion`;

-- AlterTable
ALTER TABLE `venues` DROP COLUMN `location`,
    MODIFY `country` VARCHAR(255) NOT NULL,
    MODIFY `state` VARCHAR(255) NOT NULL;
