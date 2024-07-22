import {
    Controller,
    Post,
    Body,
    Patch,
    Get,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from './dtos/createAgendamento.dto';
import { ParamId } from 'src/decorators/param-id.decorator';
import { UpdatePatchAgendamentoDto } from './dtos/updatePatchAgendamento.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.Admin, Role.User)
@Controller('agendamento')
export class AgendamentoController {
    constructor(private readonly agendamentoService: AgendamentoService) {}

    @Get()
    findAll() {
        return this.agendamentoService.findAll();
    }

    @Get('agendamento-by-paciente-id/:id')
    async readOne(@ParamId() id: number) {
        return this.agendamentoService.getAgendamentoByIdPaciente(id);
    }

    @Post()
    async create(@Body() createAgendamentoDto: CreateAgendamentoDto) {
        return this.agendamentoService.createAgendamentos(createAgendamentoDto);
    }

    @Patch('agendar-paciente/:id')
    async updateAgendamento(
        @ParamId() id: number,
        @Body() dto: UpdatePatchAgendamentoDto,
    ) {
        return this.agendamentoService.updatePartial(id, dto);
    }

    @Patch('remove-paciente/:id')
    async removePacienteVaga(
        @ParamId() id: number,
        @Body() dto: UpdatePatchAgendamentoDto,
    ) {
        return this.agendamentoService.removePacienteVaga(id, dto);
    }

    @Delete(':id')
    async delete(@ParamId() id: number) {
        return this.agendamentoService.delete(id);
    }
}
