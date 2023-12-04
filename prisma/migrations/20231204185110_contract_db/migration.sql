-- CreateTable
CREATE TABLE `Contract` (
    `id` VARCHAR(191) NOT NULL,
    `cliente_novo` BOOLEAN NOT NULL,
    `cnpj_cliente` VARCHAR(191) NOT NULL,
    `razao_social` VARCHAR(191) NULL,
    `nome_fantasia` VARCHAR(191) NULL,
    `nome_contato` VARCHAR(191) NULL,
    `email_contato` VARCHAR(191) NULL,
    `servicos_prestados` JSON NOT NULL,
    `emissao_de_nota` VARCHAR(191) NOT NULL,
    `retencao_iss_emissao_nota_fiscal` VARCHAR(191) NOT NULL,
    `forma_recebimento` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `inicio_vigencia` VARCHAR(191) NULL,
    `termino_vigencia` VARCHAR(191) NULL,
    `periodicidade` VARCHAR(191) NULL,
    `valor_do_periodo` VARCHAR(191) NULL,
    `observacoes_adicionais` VARCHAR(191) NULL,
    `valor_total_servicos` VARCHAR(191) NULL,
    `numero_parcelas` VARCHAR(191) NULL,
    `data_vencimento` VARCHAR(191) NULL,
    `observacoes_adicionais_nota_fiscal` VARCHAR(191) NULL,

    UNIQUE INDEX `Contract_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
