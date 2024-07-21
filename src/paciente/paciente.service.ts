import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePacienteDto } from './dtos/createPaciente.dto';
import { PacienteUtilsService } from './pacienteUtils.service';
import { UpdatePatchPacienteDto } from './dtos/updatePatchPaciente.dto';
import { UpdatePutPacienteDto } from './dtos/updatePutPaciente.dto';

@Injectable()
export class PacienteService {
    constructor(
        private prismaService: PrismaService,
        private pacienteUtilsService: PacienteUtilsService,
    ) {}

    async findAll() {
        return this.prismaService.paciente.findMany();
    }

    async getPacienteById(id: number) {
        if (
            !(await this.prismaService.paciente.count({
                where: {
                    id,
                },
            }))
        ) {
            throw new HttpException(`Paciente com o ID ${id} não existe.`, 400);
        }

        return this.prismaService.paciente.findUnique({
            where: {
                id,
            },
        });
    }

    async create(data: CreatePacienteDto) {
        data.nome = data.nome.toUpperCase();

        const cpfValido = this.pacienteUtilsService.validadorDeCPF(data.cpf);

        if (!cpfValido) throw new HttpException('CPF inválido', 400);

        data.cpf = data.cpf.replaceAll('.', '');
        data.cpf = data.cpf.replace('-', '');

        if (
            await this.prismaService.paciente.count({
                where: {
                    cpf: data.cpf,
                },
            })
        ) {
            throw new HttpException(
                `CPF já cadastrado em algum paciente.`,
                400,
            );
        }

        if (
            await this.prismaService.paciente.count({
                where: {
                    numero_carteirinha: data.numero_carteirinha,
                },
            })
        ) {
            throw new HttpException(
                `Numero de carteirinha já cadastrado em algum paciente.`,
                400,
            );
        }

        return this.prismaService.paciente.create({ data });
    }

    async updatePartial(
        id: number,
        { nome, cpf, numero_carteirinha }: UpdatePatchPacienteDto,
    ) {
        const pacienteExistent = await this.prismaService.paciente.findUnique({
            where: {
                id,
            },
        });

        if (!pacienteExistent)
            throw new HttpException(`Paciente com o ID ${id} não existe.`, 400);

        const data: any = {};

        if (cpf) {
            const cpfValido = this.pacienteUtilsService.validadorDeCPF(cpf);

            if (!cpfValido) throw new HttpException('CPF inválido', 400);

            cpf = cpf.replaceAll('.', '');
            cpf = cpf.replace('-', '');

            if (
                await this.prismaService.paciente.count({
                    where: {
                        cpf,
                        id: {
                            not: id,
                        },
                    },
                })
            ) {
                throw new HttpException(
                    `CPF já cadastrado em algum paciente.`,
                    400,
                );
            }

            data.cpf = cpf;
        }

        if (numero_carteirinha) {
            if (
                await this.prismaService.paciente.count({
                    where: {
                        numero_carteirinha,
                        id: {
                            not: id,
                        },
                    },
                })
            ) {
                throw new HttpException(
                    `Numero de carteirinha já cadastrado em algum paciente.`,
                    400,
                );
            }

            data.numero_carteirinha = numero_carteirinha;
        }

        if (nome) {
            data.nome = nome.toUpperCase();
        }

        // data.updated_at = new Date();
        return this.prismaService.paciente.update({
            data,
            where: {
                id,
            },
        });
    }

    async update(
        id: number,
        { nome, cpf, numero_carteirinha }: UpdatePutPacienteDto,
    ) {
        const pacienteExistent = await this.prismaService.paciente.findUnique({
            where: {
                id,
            },
        });

        if (!pacienteExistent)
            throw new HttpException(`Paciente com o ID ${id} não existe.`, 400);

        const cpfValido = this.pacienteUtilsService.validadorDeCPF(cpf);

        if (!cpfValido) throw new HttpException('CPF inválido', 400);

        cpf = cpf.replaceAll('.', '');
        cpf = cpf.replace('-', '');

        if (
            await this.prismaService.paciente.count({
                where: {
                    cpf,
                    id: {
                        not: id,
                    },
                },
            })
        ) {
            throw new HttpException(
                `CPF já cadastrado em algum paciente.`,
                400,
            );
        }

        if (
            await this.prismaService.paciente.count({
                where: {
                    numero_carteirinha,
                    id: {
                        not: id,
                    },
                },
            })
        ) {
            throw new HttpException(
                `Numero de carteirinha já cadastrado em algum paciente.`,
                400,
            );
        }

        const data: UpdatePutPacienteDto = {
            nome: nome.toUpperCase(),
            cpf,
            numero_carteirinha,
        };

        // data.updated_at = new Date();
        return this.prismaService.paciente.update({
            data,
            where: {
                id,
            },
        });
    }

    async delete(id: number) {
        const medicoExistente = await this.prismaService.paciente.findUnique({
            where: {
                id,
            },
        });

        if (!medicoExistente) {
            throw new HttpException(`Paciente com o ID ${id} não existe.`, 400);
        }

        return this.prismaService.paciente.delete({
            where: {
                id,
            },
        });
    }
}
