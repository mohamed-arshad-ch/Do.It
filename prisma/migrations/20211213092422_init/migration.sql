/*
  Warnings:

  - A unique constraint covering the columns `[ledger_name]` on the table `Ledgers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Ledgers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ledger_name` to the `Ledgers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opening_balance` to the `Ledgers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ledgers` ADD COLUMN `description` VARCHAR(255) NOT NULL,
    ADD COLUMN `ledger_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `opening_balance` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Ledger_Group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Ledgers_ledger_name_key` ON `Ledgers`(`ledger_name`);

-- CreateIndex
CREATE UNIQUE INDEX `Users_uid_key` ON `Users`(`uid`);

-- AddForeignKey
ALTER TABLE `Ledger_Group` ADD CONSTRAINT `Ledger_Group_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Ledgers`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
