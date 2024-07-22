import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAgendamentoDto } from './dtos/createAgendamento.dto';
import { UpdatePatchAgendamentoDto } from './dtos/updatePatchAgendamento.dto';

@Injectable()
export class AgendamentoService {
    constructor(private prismaService: PrismaService) {}

    async findAll() {
        return this.prismaService.agendamento.findMany();
    }

    async getAgendamentoByIdPaciente(id: number) {
        if (
            !(await this.prismaService.agendamento.count({
                where: {
                    id_paciente: id,
                },
            }))
        ) {
            throw new HttpException(
                `Não existe agendamento para o paciente de ID ${id}.`,
                400,
            );
        }

        return this.prismaService.agendamento.findMany({
            where: {
                id_paciente: {
                    equals: id,
                },
            },
        });
    }

    async createAgendamentos({
        data_inicial,
        data_final,
        duracao_consulta,
        id_medico,
        id_especialidade,
    }: CreateAgendamentoDto) {
        const startDate = new Date(data_inicial);
        const endDate = new Date(data_final);

        if (
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) >
            3
        ) {
            throw new HttpException(
                'O intervalo entre data inicial e data final não pode ser maior que 3 dias.',
                400,
            );
        }

        if (
            !(await this.prismaService.medico_Especialidade.count({
                where: {
                    medico_id: id_medico,
                    especialidade_id: id_especialidade,
                },
            }))
        ) {
            throw new HttpException(
                `Este médico não possui esta especialidade.`,
                400,
            );
        }

        try {
            const dias = Math.ceil(
                (new Date(data_final).getTime() -
                    new Date(data_inicial).getTime()) /
                    86400000,
            );

            let horarios_marcacao: string[] = [];

            if (duracao_consulta == 30) {
                horarios_marcacao = [
                    '09:00',
                    '09:30',
                    '10:00',
                    '10:30',
                    '11:00',
                ];
            } else {
                horarios_marcacao = ['09:00', '10:00', '11:00'];
            }

            const agendamentos: any[] = [];
            for (let i = 0; i <= dias; i++) {
                const currentDay = new Date(startDate);

                console.log(currentDay);

                currentDay.setDate(startDate.getDate() + i);

                console.log(currentDay);

                for (let j = 0; j < horarios_marcacao.length; j++) {
                    console.log(horarios_marcacao.length);

                    agendamentos.push({
                        id_medico,
                        id_especialidade,
                        data_agenda: new Date(
                            currentDay.toISOString().split('T')[0],
                        ),
                        hora: horarios_marcacao[j],
                    });

                    console.log('inseriu', {
                        id_medico,
                        id_especialidade,
                        data_agenda: new Date(
                            currentDay.toISOString().split('T')[0],
                        ),
                        hora: horarios_marcacao[j],
                    });
                }
            }

            await this.prismaService.$transaction(async (prisma) => {
                for (const agendamento of agendamentos) {
                    await prisma.agendamento.create({
                        data: agendamento,
                    });
                }
            });
        } catch (error) {
            console.log(error);
            throw new HttpException(
                'Erro ao inserir agendamentos',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updatePartial(
        id: number,
        { id_paciente }: UpdatePatchAgendamentoDto,
    ) {
        if (
            !(await this.prismaService.agendamento.count({
                where: {
                    id,
                    id_paciente: {
                        equals: null,
                    },
                },
            }))
        ) {
            throw new HttpException(
                `Agendamento com ID ${id} não existe ou vaga a não está disponível`,
                400,
            );
        }

        const data: any = {};

        data.id_paciente = id_paciente;

        // data.updated_at = new Date();
        return this.prismaService.agendamento.update({
            data,
            where: {
                id,
            },
        });
    }

    async removePacienteVaga(
        id: number,
        { id_paciente }: UpdatePatchAgendamentoDto,
    ) {
        if (
            !(await this.prismaService.agendamento.count({
                where: {
                    id,
                    id_paciente,
                },
            }))
        ) {
            throw new HttpException(
                `Agendamento com ID ${id} não existe ou não possui paciente nesta vaga.`,
                400,
            );
        }

        const data: any = {};

        data.id_paciente = null;

        // data.updated_at = new Date();
        return this.prismaService.agendamento.update({
            data,
            where: {
                id,
            },
        });
    }

    async delete(id: number) {
        const agendamentoExistente =
            await this.prismaService.agendamento.findUnique({
                where: {
                    id,
                },
            });

        if (!agendamentoExistente) {
            throw new HttpException(
                `Agendamento com o ID ${id} não existe.`,
                400,
            );
        }

        if (agendamentoExistente.id_paciente) {
            throw new HttpException(
                `Vaga com paciente, primeiro remova o paciente da vaga.`,
                400,
            );
        }

        return this.prismaService.agendamento.delete({
            where: {
                id,
            },
        });
    }
}
