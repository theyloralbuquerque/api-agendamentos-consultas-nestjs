import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateAgendamentoDto } from './dtos/updateAgendamento.dto';

@Injectable()
export class AgendamentoService {
    constructor(private prisma: PrismaService) {}

    async createAgendamentos(
        dataInicial: Date,
        dataFinal: Date,
        duracaoConsulta: number,
        idMedico: number,
        idEspecialidade: number,
    ) {
        const agendamentos = [];
        for (
            let d = new Date(dataInicial);
            d <= new Date(dataFinal);
            d.setDate(d.getDate() + 1)
        ) {
            for (let hora = 9; hora < 11; hora += duracaoConsulta / 60) {
                agendamentos.push({
                    id_medico: idMedico,
                    id_especialidade: idEspecialidade,
                    data_agenda: new Date(d),
                    hora: new Date(d.setHours(hora)),
                });
            }
        }

        return this.prisma.agendamento.createMany({
            data: agendamentos,
        });
    }

    async findAll() {
        return this.prisma.agendamento.findMany();
    }

    async update(id: number, data: UpdateAgendamentoDto) {
        return this.prisma.agendamento.update({
            where: { id },
            data,
        });
    }
}
