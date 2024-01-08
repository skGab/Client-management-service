/*
  Warnings:

  - You are about to drop the column `cnpj_cliente` on the `Contract` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cnpj_cpf]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnpj_cpf]` on the table `Contract` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpj_cpf` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Contract_cnpj_cliente_key` ON `Contract`;

-- AlterTable
ALTER TABLE `Contract` DROP COLUMN `cnpj_cliente`,
    ADD COLUMN `cnpj_cpf` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Client_cnpj_cpf_key` ON `Client`(`cnpj_cpf`);

-- CreateIndex
CREATE UNIQUE INDEX `Contract_cnpj_cpf_key` ON `Contract`(`cnpj_cpf`);
