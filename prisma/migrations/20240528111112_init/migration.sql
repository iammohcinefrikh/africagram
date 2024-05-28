-- CreateTable
CREATE TABLE `_comment` (
    `commentId` INTEGER NOT NULL AUTO_INCREMENT,
    `commentMessage` VARCHAR(2200) NOT NULL,
    `commentCreationDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `userId` INTEGER NOT NULL,
    `postId` INTEGER NOT NULL,

    INDEX `postId`(`postId`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`commentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_follow` (
    `followId` INTEGER NOT NULL AUTO_INCREMENT,
    `followingId` INTEGER NOT NULL,
    `followerId` INTEGER NOT NULL,
    `followCreationDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`followId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_like` (
    `likeId` INTEGER NOT NULL AUTO_INCREMENT,
    `likeCreationDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `userId` INTEGER NOT NULL,
    `postId` INTEGER NOT NULL,

    INDEX `postId`(`postId`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`likeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_post` (
    `postId` INTEGER NOT NULL AUTO_INCREMENT,
    `postCaption` VARCHAR(2200) NOT NULL,
    `postCreationDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `postModificationDate` DATETIME(0) NULL,
    `userId` INTEGER NOT NULL,

    INDEX `userId`(`userId`),
    PRIMARY KEY (`postId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_profile` (
    `profileId` INTEGER NOT NULL AUTO_INCREMENT,
    `profileSexe` VARCHAR(255) NULL,
    `profileCountry` VARCHAR(255) NULL,
    `profileCity` VARCHAR(255) NULL,
    `profileCreationDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `profileModificationDate` DATETIME(0) NULL,
    `userId` INTEGER NOT NULL,

    INDEX `userId`(`userId`),
    PRIMARY KEY (`profileId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_user` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `userFirstName` VARCHAR(255) NOT NULL,
    `userLastName` VARCHAR(255) NOT NULL,
    `userEmail` VARCHAR(255) NOT NULL,
    `userPassword` VARCHAR(255) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    `userCreationDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `userModificationDate` DATETIME(0) NULL,
    `profileId` INTEGER NOT NULL,

    UNIQUE INDEX `userEmail`(`userEmail`),
    INDEX `profileId`(`profileId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_comment` ADD CONSTRAINT `_comment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `_user`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `_comment` ADD CONSTRAINT `_comment_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `_post`(`postId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `_like` ADD CONSTRAINT `_like_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `_user`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `_like` ADD CONSTRAINT `_like_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `_post`(`postId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `_post` ADD CONSTRAINT `_post_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `_user`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `_profile` ADD CONSTRAINT `_profile_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `_user`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `_user` ADD CONSTRAINT `_user_ibfk_1` FOREIGN KEY (`profileId`) REFERENCES `_profile`(`profileId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
