-- AlterTable
ALTER TABLE `collaborators` MODIFY `level` ENUM('Pendiente', 'Básico', 'Avanzado') NOT NULL DEFAULT 'Pendiente',
    MODIFY `language` ENUM('Pendiente', 'Inglés', 'Español') NOT NULL DEFAULT 'Pendiente';

-- AlterTable
ALTER TABLE `groups` ADD COLUMN `status` ENUM('Aprobada', 'Cancelada') NOT NULL DEFAULT 'Aprobada';

-- AlterTable
ALTER TABLE `superusers` ADD COLUMN `maternal_name` VARCHAR(255) NULL,
    ADD COLUMN `name` VARCHAR(255) NULL,
    ADD COLUMN `paternal_name` VARCHAR(255) NULL,
    ADD COLUMN `profile_image` BLOB NULL,
    ADD COLUMN `tokenVersion` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `venue_coordinators` ADD COLUMN `tokenVersion` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `venues` ADD COLUMN `location` VARCHAR(255) NULL,
    MODIFY `country` VARCHAR(255) NULL,
    MODIFY `state` VARCHAR(255) NULL;
