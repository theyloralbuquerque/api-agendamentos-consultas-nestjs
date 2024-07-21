import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicoEspecialidadeDto } from './dtos/createMedicoEspecialidade.dto';

@Injectable()
export class MedicoEspecialidadeService {
    constructor(private prismaService: PrismaService) {}

    async findAll() {
        return this.prismaService.medico_Especialidade.findMany();
    }

    async findOne(id: number) {
        if (
            !(await this.prismaService.medico_Especialidade.count({
                where: {
                    id,
                },
            }))
        ) {
            throw new HttpException(
                `Relação medico_especialidade com o ID ${id} não existe.`,
                400,
            );
        }

        return this.prismaService.medico_Especialidade.findUnique({
            where: { id },
        });
    }

    async create(data: CreateMedicoEspecialidadeDto) {
        if (
            !(await this.prismaService.medico.count({
                where: {
                    id: data.medico_id,
                },
            }))
        ) {
            throw new HttpException(
                `Médico com o ID ${data.medico_id} não existe.`,
                400,
            );
        }

        if (
            !(await this.prismaService.especialidade.count({
                where: {
                    id: data.especialidade_id,
                },
            }))
        ) {
            throw new HttpException(
                `Especialidade com o ID ${data.especialidade_id} não existe.`,
                400,
            );
        }

        if (
            await this.prismaService.medico_Especialidade.count({
                where: {
                    medico_id: data.medico_id,
                    especialidade_id: data.especialidade_id,
                },
            })
        )
            throw new HttpException(
                `Especialidade já cadastrada no médico`,
                400,
            );

        return this.prismaService.medico_Especialidade.create({ data });
    }

    async delete(id: number) {
        const medicoEspecialidadeExistente =
            await this.prismaService.medico_Especialidade.findUnique({
                where: {
                    id,
                },
            });

        if (!medicoEspecialidadeExistente) {
            throw new HttpException(
                `Relação Médico-Especialidade com o ID ${id} não existe.`,
                400,
            );
        }

        return this.prismaService.medico_Especialidade.delete({
            where: {
                id,
            },
        });
    }
}
