import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Put,
    UseGuards,
    Delete,
} from '@nestjs/common';
import { CreatePacienteDto } from './dtos/createPaciente.dto';
import { PacienteService } from './paciente.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { UpdatePutPacienteDto } from './dtos/updatePutPaciente.dto';
import { UpdatePatchPacienteDto } from './dtos/updatePatchPaciente.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.Admin, Role.User)
@Controller('paciente')
export class PacienteController {
    constructor(private readonly pacienteService: PacienteService) {}

    @Get()
    findAll() {
        return this.pacienteService.findAll();
    }

    @Get(':id')
    async readOne(@ParamId() id: number) {
        return this.pacienteService.getPacienteById(id);
    }

    @Post()
    create(@Body() createPacienteDto: CreatePacienteDto) {
        return this.pacienteService.create(createPacienteDto);
    }

    @Patch(':id')
    async updatePartial(
        @ParamId() id: number,
        @Body() dto: UpdatePatchPacienteDto,
    ) {
        return this.pacienteService.updatePartial(id, dto);
    }

    @Put(':id')
    async update(@ParamId() id: number, @Body() dto: UpdatePutPacienteDto) {
        return this.pacienteService.update(id, dto);
    }

    @Delete(':id')
    async delete(@ParamId() id: number) {
        return this.pacienteService.delete(id);
    }
}
