/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `ledger_group` DROP FOREIGN KEY `Ledger_Group_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ledgers` DROP FOREIGN KEY `Ledgers_userId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_userId_fkey`;

-- AlterTable
ALTER TABLE `ledger_group` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ledgers` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `transactions` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `uid` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`uid`);

-- AddForeignKey
ALTER TABLE `Ledgers` ADD CONSTRAINT `Ledgers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ledger_Group` ADD CONSTRAINT `Ledger_Group_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Ledgers`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Ledgers`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
