/*
  Warnings:

  - You are about to alter the column `numero_crm` on the `medico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `numero_carteirinha` on the `paciente` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `medico` MODIFY `numero_crm` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `paciente` MODIFY `numero_carteirinha` INTEGER NOT NULL;
