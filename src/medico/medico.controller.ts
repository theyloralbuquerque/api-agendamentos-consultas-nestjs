import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Put,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { MedicoService } from './medico.service';
import { CreateMedicoDto } from './dtos/createMedico.dto';
import { ParamId } from 'src/decorators/param-id.decorator';
import { UpdatePatchMedicoDto } from './dtos/updatePatchMedico.dto';
import { UpdatePutMedicoDto } from './dtos/updatePutMedico.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.Admin, Role.User)
@Controller('medico')
export class MedicoController {
    constructor(private readonly medicoService: MedicoService) {}

    @Get()
    findAll() {
        return this.medicoService.findAll();
    }

    @Get(':id')
    async readOne(@ParamId() id: number) {
        return this.medicoService.getMedicoById(id);
    }

    @Post()
    create(@Body() createMedicoDto: CreateMedicoDto) {
        return this.medicoService.create(createMedicoDto);
    }

    @Patch(':id')
    async updatePartial(
        @ParamId() id: number,
        @Body() dto: UpdatePatchMedicoDto,
    ) {
        return this.medicoService.updatePartial(id, dto);
    }

    @Put(':id')
    async update(@ParamId() id: number, @Body() dto: UpdatePutMedicoDto) {
        return this.medicoService.update(id, dto);
    }

    @Delete(':id')
    async delete(@ParamId() id: number) {
        return this.medicoService.delete(id);
    }
}
