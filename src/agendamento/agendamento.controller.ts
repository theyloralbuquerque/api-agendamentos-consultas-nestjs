import {
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Body,
    BadRequestException,
} from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from './dtos/createAgendamento.dto';
import { UpdateAgendamentoDto } from './dtos/updateAgendamento.dto';

@Controller('agendamento')
export class AgendamentoController {
    constructor(private readonly agendamentoService: AgendamentoService) {}

    @Post()
    async create(@Body() createAgendamentoDto: CreateAgendamentoDto) {
        const {
            dataInicial,
            dataFinal,
            duracaoConsulta,
            idMedico,
            idEspecialidade,
        } = createAgendamentoDto;
        if (
            (new Date(dataFinal).getTime() - new Date(dataInicial).getTime()) /
                (1000 * 60 * 60 * 24) >
            3
        ) {
            throw new BadRequestException(
                'O intervalo entre data inicial e data final não pode ser maior que 3 dias.',
            );
        }
        return this.agendamentoService.createAgendamentos(
            dataInicial,
            dataFinal,
            duracaoConsulta,
            idMedico,
            idEspecialidade,
        );
    }

    @Get()
    findAll() {
        return this.agendamentoService.findAll();
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateAgendamentoDto: UpdateAgendamentoDto,
    ) {
        return this.agendamentoService.update(+id, updateAgendamentoDto);
    }
}
