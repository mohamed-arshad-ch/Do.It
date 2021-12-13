-- DropForeignKey
ALTER TABLE `ledgergroup` DROP FOREIGN KEY `LedgerGroup_ledgersId_fkey`;

-- DropForeignKey
ALTER TABLE `ledgergroup` DROP FOREIGN KEY `LedgerGroup_uid_fkey`;

-- AddForeignKey
ALTER TABLE `ledgergroup` ADD CONSTRAINT `ledgergroup_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `Users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ledgergroup` ADD CONSTRAINT `ledgergroup_ledgersId_fkey` FOREIGN KEY (`ledgersId`) REFERENCES `Ledgers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RedefineIndex
CREATE UNIQUE INDEX `ledgergroup_id_key` ON `ledgergroup`(`id`);
DROP INDEX `LedgerGroup_id_key` ON `ledgergroup`;
