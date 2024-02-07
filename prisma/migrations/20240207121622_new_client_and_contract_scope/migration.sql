/*
  Warnings:

  - You are about to drop the column `clientId` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `cliente_novo` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `email_contato` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `emissao_de_nota` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `forma_recebimento` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `nome_contato` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `nome_fantasia` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `observacoes_adicionais_nota_fiscal` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `razao_social` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `retencao_iss_emissao_nota_fiscal` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `valor_do_periodo` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `valor_total_servicos` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Contract` DROP FOREIGN KEY `Contract_clientId_fkey`;

-- AlterTable
ALTER TABLE `Contract` DROP COLUMN `clientId`,
    DROP COLUMN `cliente_novo`,
    DROP COLUMN `email_contato`,
    DROP COLUMN `emissao_de_nota`,
    DROP COLUMN `forma_recebimento`,
    DROP COLUMN `nome_contato`,
    DROP COLUMN `nome_fantasia`,
    DROP COLUMN `observacoes_adicionais_nota_fiscal`,
    DROP COLUMN `razao_social`,
    DROP COLUMN `retencao_iss_emissao_nota_fiscal`,
    DROP COLUMN `valor_do_periodo`,
    DROP COLUMN `valor_total_servicos`,
    ADD COLUMN `clientCnpjId` VARCHAR(191) NULL,
    ADD COLUMN `valor_total` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Client`;

-- CreateTable
CREATE TABLE `BasicClient` (
    `id` VARCHAR(191) NOT NULL,
    `nome_cliente` VARCHAR(191) NOT NULL,
    `site` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `BasicClient_id_key`(`id`),
    UNIQUE INDEX `BasicClient_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClientCnpj` (
    `id` VARCHAR(191) NOT NULL,
    `razao_social` VARCHAR(191) NOT NULL,
    `nome_cliente` VARCHAR(191) NOT NULL,
    `site` VARCHAR(191) NOT NULL,
    `cnpj_cpf` VARCHAR(191) NOT NULL,
    `insc_estadual` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `endereco_atendimento` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `ddd` VARCHAR(191) NOT NULL,
    `fax` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `endereco_faturamento` VARCHAR(191) NOT NULL,
    `bairro_faturamento` VARCHAR(191) NOT NULL,
    `cep_faturamento` VARCHAR(191) NOT NULL,
    `cidade_faturamento` VARCHAR(191) NOT NULL,
    `estado_faturamento` VARCHAR(191) NOT NULL,
    `ddd_faturamento` VARCHAR(191) NOT NULL,
    `fax_faturamento` VARCHAR(191) NOT NULL,
    `telefone_faturamento` VARCHAR(191) NOT NULL,
    `responsavel_financeiro` VARCHAR(191) NOT NULL,
    `ddd_financeiro` VARCHAR(191) NOT NULL,
    `telefone_financeiro` VARCHAR(191) NOT NULL,
    `email_financeiro` VARCHAR(191) NOT NULL,
    `nome_representante` VARCHAR(191) NOT NULL,
    `estado_civil_representante` VARCHAR(191) NOT NULL,
    `profissao_representante` VARCHAR(191) NOT NULL,
    `rg_representante` VARCHAR(191) NOT NULL,
    `cpf_representante` VARCHAR(191) NOT NULL,
    `email_representante` VARCHAR(191) NOT NULL,
    `telefone_representante` VARCHAR(191) NOT NULL,
    `nascimento_representante` VARCHAR(191) NOT NULL,
    `email_boleto_notas` VARCHAR(191) NOT NULL,
    `emissao_notas` VARCHAR(191) NOT NULL,
    `retencao_iss` VARCHAR(191) NOT NULL,
    `forma_recebimento` VARCHAR(191) NOT NULL,
    `nome_segundo_contato` VARCHAR(191) NOT NULL,
    `estado_civil_segundo_contato` VARCHAR(191) NOT NULL,
    `profissao_segundo_contato` VARCHAR(191) NOT NULL,
    `rg_segundo_contato` VARCHAR(191) NOT NULL,
    `cpf_segundo_contato` VARCHAR(191) NOT NULL,
    `email_segundo_contato` VARCHAR(191) NOT NULL,
    `telefone_segundo_contato` VARCHAR(191) NOT NULL,
    `nascimento_segundo_contato` VARCHAR(191) NOT NULL,
    `nome_terceiro_contato` VARCHAR(191) NOT NULL,
    `estado_civil_terceiro_contato` VARCHAR(191) NOT NULL,
    `profissao_terceiro_contato` VARCHAR(191) NOT NULL,
    `rg_terceiro_contato` VARCHAR(191) NOT NULL,
    `cpf_terceiro_contato` VARCHAR(191) NOT NULL,
    `email_terceiro_contato` VARCHAR(191) NOT NULL,
    `telefone_terceiro_contato` VARCHAR(191) NOT NULL,
    `nascimento_terceiro_contato` VARCHAR(191) NOT NULL,
    `basicClientId` VARCHAR(191) NULL,

    UNIQUE INDEX `ClientCnpj_id_key`(`id`),
    UNIQUE INDEX `ClientCnpj_cnpj_cpf_key`(`cnpj_cpf`),
    UNIQUE INDEX `ClientCnpj_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClientCnpj` ADD CONSTRAINT `ClientCnpj_basicClientId_fkey` FOREIGN KEY (`basicClientId`) REFERENCES `BasicClient`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_clientCnpjId_fkey` FOREIGN KEY (`clientCnpjId`) REFERENCES `ClientCnpj`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
