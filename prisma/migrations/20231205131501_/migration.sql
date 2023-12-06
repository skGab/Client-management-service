/*
  Warnings:

  - A unique constraint covering the columns `[cnpj_cliente]` on the table `Contract` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Contract_cnpj_cliente_key` ON `Contract`(`cnpj_cliente`);
