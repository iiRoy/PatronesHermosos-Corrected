-- AlterTable
ALTER TABLE `participants` MODIFY `participation_file` LONGBLOB NOT NULL;

-- AlterTable
ALTER TABLE `superusers` MODIFY `profile_image` LONGBLOB NULL;

-- AlterTable
ALTER TABLE `venue_coordinators` MODIFY `profile_image` LONGBLOB NULL;

-- AlterTable
ALTER TABLE `venues` MODIFY `logo` LONGBLOB NULL,
    MODIFY `participation_file` LONGBLOB NOT NULL;
