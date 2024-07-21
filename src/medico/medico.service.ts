import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicoDto } from './dtos/createMedico.dto';
import { UpdatePutMedicoDto } from './dtos/updatePutMedico.dto';
import { UpdatePatchMedicoDto } from './dtos/updatePatchMedico.dto';

@Injectable()
export class MedicoService {
    constructor(private prismaService: PrismaService) {}

    async findAll() {
        return this.prismaService.medico.findMany();
    }

    async getMedicoById(id: number) {
        if (
            !(await this.prismaService.medico.count({
                where: {
                    id,
                },
            }))
        ) {
            throw new HttpException(`Médico com o ID ${id} não existe.`, 400);
        }

        return this.prismaService.medico.findUnique({
            where: {
                id,
            },
        });
    }

    async create(data: CreateMedicoDto) {
        data.uf = data.uf.toUpperCase();

        if (
            await this.prismaService.medico.count({
                where: {
                    numero_crm: data.numero_crm,
                    uf: data.uf,
                },
            })
        ) {
            throw new HttpException(`CRM já cadastrado nessa UF.`, 400);
        }
        return this.prismaService.medico.create({ data });
    }

    async updatePartial(
        id: number,
        { nome, uf, numero_crm }: UpdatePatchMedicoDto,
    ) {
        if (
            !(await this.prismaService.medico.count({
                where: {
                    id,
                },
            }))
        ) {
            throw new HttpException(`Médico com o ID ${id} não existe.`, 400);
        }

        uf = uf.toUpperCase();
        if (
            await this.prismaService.medico.count({
                where: {
                    numero_crm,
                    uf,
                },
            })
        ) {
            throw new HttpException(`CRM já cadastrado nessa UF.`, 400);
        }

        const data: any = {};

        if (nome) {
            data.nome = nome;
        }
        if (uf) {
            data.uf = uf;
        }
        if (numero_crm) {
            data.numero_crm = numero_crm;
        }

        // data.updated_at = new Date();
        return this.prismaService.medico.update({
            data,
            where: {
                id,
            },
        });
    }

    async update(id: number, { nome, uf, numero_crm }: UpdatePutMedicoDto) {
        if (
            !(await this.prismaService.medico.count({
                where: {
                    id,
                },
            }))
        ) {
            throw new HttpException(`Médico com o ID ${id} não existe.`, 400);
        }

        uf = uf.toUpperCase();
        if (
            await this.prismaService.medico.count({
                where: {
                    numero_crm,
                    uf,
                },
            })
        ) {
            throw new HttpException(`CRM já cadastrado nessa UF.`, 400);
        }

        const data: UpdatePutMedicoDto = { nome, uf, numero_crm };

        // data.updated_at = new Date();
        return this.prismaService.medico.update({
            data,
            where: {
                id,
            },
        });
    }

    async delete(id: number) {
        const medicoExistente = await this.prismaService.medico.findUnique({
            where: {
                id,
            },
        });

        if (!medicoExistente) {
            throw new HttpException(`Médico com o ID ${id} não existe.`, 400);
        }

        return this.prismaService.medico.delete({
            where: {
                id,
            },
        });
    }
}
