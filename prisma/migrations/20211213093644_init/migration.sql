/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Ledger_Group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Ledgers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `ledgers` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `users` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `Transactions` (
    `t_id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `t_type` VARCHAR(20) NOT NULL,
    `t_catagory` VARCHAR(20) NOT NULL,
    `t_note` VARCHAR(20) NOT NULL,
    `t_date` DATETIME(3) NOT NULL,
    `t_created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Transactions_t_id_key`(`t_id`),
    PRIMARY KEY (`t_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Ledger_Group_id_key` ON `Ledger_Group`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Ledgers_id_key` ON `Ledgers`(`id`);

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Ledgers`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
