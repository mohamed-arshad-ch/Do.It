/*
  Warnings:

  - You are about to drop the column `userId` on the `ledger_group` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ledgers` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `ledgersId` to the `Ledger_Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `Ledger_Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `Ledgers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ledgersId` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ledger_group` DROP FOREIGN KEY `Ledger_Group_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ledgers` DROP FOREIGN KEY `Ledgers_userId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_userId_fkey`;

-- AlterTable
ALTER TABLE `ledger_group` DROP COLUMN `userId`,
    ADD COLUMN `ledgersId` INTEGER NOT NULL,
    ADD COLUMN `uid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ledgers` DROP COLUMN `userId`,
    ADD COLUMN `uid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `userId`,
    ADD COLUMN `ledgersId` INTEGER NOT NULL,
    ADD COLUMN `uid` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Ledgers` ADD CONSTRAINT `Ledgers_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `Users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ledger_Group` ADD CONSTRAINT `Ledger_Group_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `Users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ledger_Group` ADD CONSTRAINT `Ledger_Group_ledgersId_fkey` FOREIGN KEY (`ledgersId`) REFERENCES `Ledgers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `Users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_ledgersId_fkey` FOREIGN KEY (`ledgersId`) REFERENCES `Ledgers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
