/*
  Warnings:

  - You are about to drop the `ledger_group` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ledger_group` DROP FOREIGN KEY `Ledger_Group_ledgersId_fkey`;

-- DropForeignKey
ALTER TABLE `ledger_group` DROP FOREIGN KEY `Ledger_Group_uid_fkey`;

-- DropTable
DROP TABLE `ledger_group`;

-- CreateTable
CREATE TABLE `LedgerGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `group_name` VARCHAR(20) NOT NULL,
    `ledgersId` INTEGER NOT NULL,

    UNIQUE INDEX `LedgerGroup_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LedgerGroup` ADD CONSTRAINT `LedgerGroup_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `Users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LedgerGroup` ADD CONSTRAINT `LedgerGroup_ledgersId_fkey` FOREIGN KEY (`ledgersId`) REFERENCES `Ledgers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
