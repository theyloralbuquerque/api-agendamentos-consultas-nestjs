/*
  Warnings:

  - You are about to alter the column `status` on the `especialidade` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `especialidade` MODIFY `status` ENUM('A', 'I') NOT NULL;
