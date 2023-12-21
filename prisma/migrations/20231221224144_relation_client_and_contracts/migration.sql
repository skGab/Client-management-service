-- AlterTable
ALTER TABLE `Contract` ADD COLUMN `clientId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
