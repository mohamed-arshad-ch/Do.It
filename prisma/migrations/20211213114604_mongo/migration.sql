/*
  Warnings:

  - You are about to drop the column `mongo_id` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `mongo_id`,
    MODIFY `uid` INTEGER NOT NULL;
