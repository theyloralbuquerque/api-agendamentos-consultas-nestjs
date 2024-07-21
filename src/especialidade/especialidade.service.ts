import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEspecialidadeDto } from './dtos/especialidadeCreate.do';
import { UpdatePatchEspecialidadeDto } from './dtos/updatePatchEspecialidade.dto';
import { UpdatePutEspecialidadeDto } from './dtos/updatePutEspecialidade.dto';

@Injectable()
export class EspecialidadeService {
    constructor(private prismaService: PrismaService) {}

    async findAll() {
        return this.prismaService.especialidade.findMany();
    }

    async getEspecialidadeById(id: number) {
        if (
            !(await this.prismaService.especialidade.count({
                where: {
                    id,
                },
            }))
        ) {
            throw new HttpException(
                `Especialidade com o ID ${id} não existe.`,
                400,
            );
        }

        return this.prismaService.especialidade.findUnique({
            where: {
                id,
            },
        });
    }

    async create(data: CreateEspecialidadeDto) {
        if (
            await this.prismaService.especialidade.count({
                where: {
                    codigo: data.codigo,
                },
            })
        ) {
            throw new HttpException(
                `Código já cadastrado em outra especialidade.`,
                400,
            );
        }

        data.nome = data.nome.toUpperCase();

        return this.prismaService.especialidade.create({ data });
    }

    async updatePartial(
        id: number,
        { nome, codigo, status }: UpdatePatchEspecialidadeDto,
    ) {
        const especialidadeExistente =
            await this.prismaService.especialidade.findUnique({
                where: {
                    id,
                },
            });

        if (!especialidadeExistente) {
            throw new HttpException(
                `Especialidade com o ID ${id} não existe.`,
                400,
            );
        }

        if (codigo) {
            if (
                await this.prismaService.especialidade.count({
                    where: {
                        codigo,
                        id: {
                            not: id,
                        },
                    },
                })
            ) {
                throw new HttpException(
                    `Código já cadastrado em outra especialidade.`,
                    400,
                );
            }
        }

        const data: any = {};

        if (nome) {
            data.nome = nome.toUpperCase();
        }
        if (codigo) {
            data.codigo = codigo;
        }
        if (status) {
            data.status = status;
        }

        // data.updated_at = new Date();
        return this.prismaService.especialidade.update({
            data,
            where: {
                id,
            },
        });
    }

    async update(
        id: number,
        { nome, codigo, status }: UpdatePutEspecialidadeDto,
    ) {
        if (
            !(await this.prismaService.especialidade.count({
                where: {
                    id,
                },
            }))
        ) {
            throw new HttpException(
                `Especialidade com o ID ${id} não existe.`,
                400,
            );
        }

        if (
            await this.prismaService.especialidade.count({
                where: {
                    codigo,
                    id: {
                        not: id,
                    },
                },
            })
        ) {
            throw new HttpException(
                `Código já cadastrado em outra especialidade.`,
                400,
            );
        }

        const data: UpdatePutEspecialidadeDto = {
            nome: nome.toUpperCase(),
            codigo,
            status,
        };

        // data.updated_at = new Date();
        return this.prismaService.especialidade.update({
            data,
            where: {
                id,
            },
        });
    }

    async delete(id: number) {
        const especialidadeExistente =
            await this.prismaService.especialidade.findUnique({
                where: {
                    id,
                },
            });

        if (!especialidadeExistente) {
            throw new HttpException(
                `Especialidade com o ID ${id} não existe.`,
                400,
            );
        }

        return this.prismaService.especialidade.delete({
            where: {
                id,
            },
        });
    }
}
