/*
  Warnings:

  - You are about to alter the column `codigo` on the `especialidade` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `status` on the `especialidade` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `especialidade` MODIFY `codigo` INTEGER NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL;
