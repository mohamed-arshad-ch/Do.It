-- CreateTable
CREATE TABLE `users` (
    `uid` VARCHAR(255) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `createdAt` VARCHAR(255) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `users_uid_key`(`uid`),
    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ledgers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `ledger_name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `createdAt` VARCHAR(255) NOT NULL,
    `group_name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `ledgers_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `t_id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `group_name` VARCHAR(50) NOT NULL,
    `t_type` VARCHAR(20) NOT NULL,
    `t_catagory` VARCHAR(20) NOT NULL,
    `t_note` VARCHAR(1000) NOT NULL,
    `t_date` VARCHAR(10) NOT NULL,
    `t_amount` DOUBLE NOT NULL,
    `t_created_date` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `transactions_t_id_key`(`t_id`),
    PRIMARY KEY (`t_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ledgers` ADD CONSTRAINT `ledgers_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
