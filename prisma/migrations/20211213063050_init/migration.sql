-- CreateTable
CREATE TABLE `Users` (
    `mongo_id` VARCHAR(255) NOT NULL,
    `uid` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
