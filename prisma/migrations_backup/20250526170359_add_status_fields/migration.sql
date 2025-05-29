-- AlterTable
ALTER TABLE `assistant_coordinators` ADD COLUMN `status` ENUM('Pendiente', 'Aprobada', 'Rechazada', 'Cancelada') NOT NULL DEFAULT 'Pendiente';

-- AlterTable
ALTER TABLE `mentors` ADD COLUMN `status` ENUM('Pendiente', 'Aprobada', 'Rechazada', 'Cancelada') NOT NULL DEFAULT 'Pendiente';

-- AlterTable
ALTER TABLE `venue_coordinators` ADD COLUMN `status` ENUM('Pendiente', 'Aprobada', 'Rechazada', 'Cancelada') NOT NULL DEFAULT 'Pendiente';
