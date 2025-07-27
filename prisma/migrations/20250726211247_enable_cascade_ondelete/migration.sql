/*
  Warnings:

  - A unique constraint covering the columns `[tokenId]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `ApplicantAnswer_applicantId_fkey` ON `applicantanswer`;

-- DropIndex
DROP INDEX `ApplicantAnswer_questionId_fkey` ON `applicantanswer`;

-- AlterTable
ALTER TABLE `applicantanswer` MODIFY `selected` JSON NULL;

-- AlterTable
ALTER TABLE `question` ADD COLUMN `tokenId` INTEGER NULL,
    MODIFY `questionType` ENUM('objective', 'multiChoice') NOT NULL DEFAULT 'objective';

-- CreateIndex
CREATE UNIQUE INDEX `Question_tokenId_key` ON `Question`(`tokenId`);

-- AddForeignKey
ALTER TABLE `Applicant` ADD CONSTRAINT `Applicant_tokenId_fkey` FOREIGN KEY (`tokenId`) REFERENCES `Token`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApplicantAnswer` ADD CONSTRAINT `ApplicantAnswer_applicantId_fkey` FOREIGN KEY (`applicantId`) REFERENCES `Applicant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApplicantAnswer` ADD CONSTRAINT `ApplicantAnswer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
