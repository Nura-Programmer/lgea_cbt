-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Applicant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `appNo` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'IN_PROGRESS', 'DONE') NOT NULL DEFAULT 'PENDING',
    `startTime` DATETIME(3) NULL,
    `endTime` DATETIME(3) NULL,
    `score` DOUBLE NULL,
    `tokenId` INTEGER NULL,

    UNIQUE INDEX `Applicant_appNo_key`(`appNo`),
    UNIQUE INDEX `Applicant_tokenId_key`(`tokenId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `tokenType` ENUM('english', 'arabic') NOT NULL,
    `used` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Token_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tokenType` ENUM('english', 'arabic') NOT NULL,
    `tokenId` INTEGER NULL,
    `question` VARCHAR(191) NOT NULL,
    `questionType` ENUM('objective', 'multiChoice') NOT NULL DEFAULT 'objective',
    `options` JSON NOT NULL,
    `correctOption` JSON NOT NULL,
    `marks` INTEGER NULL DEFAULT 1,

    UNIQUE INDEX `Question_tokenId_key`(`tokenId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ApplicantAnswer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `applicantId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,
    `selected` JSON NULL,
    `isCorrect` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Applicant` ADD CONSTRAINT `Applicant_tokenId_fkey` FOREIGN KEY (`tokenId`) REFERENCES `Token`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApplicantAnswer` ADD CONSTRAINT `ApplicantAnswer_applicantId_fkey` FOREIGN KEY (`applicantId`) REFERENCES `Applicant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApplicantAnswer` ADD CONSTRAINT `ApplicantAnswer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
