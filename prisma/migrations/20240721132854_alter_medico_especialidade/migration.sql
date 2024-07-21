-- CreateTable
CREATE TABLE `Especialidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,

    UNIQUE INDEX `Especialidade_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `uf` VARCHAR(191) NOT NULL,
    `numero_crm` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Medico_numero_crm_key`(`numero_crm`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Paciente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `numero_carteirinha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Paciente_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Agendamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_medico` INTEGER NOT NULL,
    `id_especialidade` INTEGER NOT NULL,
    `data_agenda` DATETIME(3) NOT NULL,
    `hora` DATETIME(3) NOT NULL,
    `id_paciente` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medico_Especialidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `medico_id` INTEGER NOT NULL,
    `especialidade_id` INTEGER NOT NULL,

    UNIQUE INDEX `Medico_Especialidade_medico_id_especialidade_id_key`(`medico_id`, `especialidade_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Agendamento` ADD CONSTRAINT `Agendamento_id_medico_fkey` FOREIGN KEY (`id_medico`) REFERENCES `Medico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agendamento` ADD CONSTRAINT `Agendamento_id_especialidade_fkey` FOREIGN KEY (`id_especialidade`) REFERENCES `Especialidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agendamento` ADD CONSTRAINT `Agendamento_id_paciente_fkey` FOREIGN KEY (`id_paciente`) REFERENCES `Paciente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medico_Especialidade` ADD CONSTRAINT `Medico_Especialidade_medico_id_fkey` FOREIGN KEY (`medico_id`) REFERENCES `Medico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medico_Especialidade` ADD CONSTRAINT `Medico_Especialidade_especialidade_id_fkey` FOREIGN KEY (`especialidade_id`) REFERENCES `Especialidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
