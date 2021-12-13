/*
  Warnings:

  - Added the required column `group_name` to the `Ledger_Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ledger_group` ADD COLUMN `group_name` VARCHAR(20) NOT NULL;
