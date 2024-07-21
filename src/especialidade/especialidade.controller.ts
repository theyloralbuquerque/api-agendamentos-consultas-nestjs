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
import { EspecialidadeService } from './especialidade.service';
import { CreateEspecialidadeDto } from './dtos/especialidadeCreate.do';
import { ParamId } from 'src/decorators/param-id.decorator';
import { UpdatePatchEspecialidadeDto } from './dtos/updatePatchEspecialidade.dto';
import { UpdatePutEspecialidadeDto } from './dtos/updatePutEspecialidade.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.Admin, Role.User)
@Controller('especialidade')
export class EspecialidadeController {
    constructor(private readonly especialidadeService: EspecialidadeService) {}

    @Get()
    findAll() {
        return this.especialidadeService.findAll();
    }

    @Get(':id')
    async readOne(@ParamId() id: number) {
        return this.especialidadeService.getEspecialidadeById(id);
    }

    @Post()
    create(@Body() createEspecialidadeDto: CreateEspecialidadeDto) {
        return this.especialidadeService.create(createEspecialidadeDto);
    }

    @Patch(':id')
    async updatePartial(
        @ParamId() id: number,
        @Body() dto: UpdatePatchEspecialidadeDto,
    ) {
        return this.especialidadeService.updatePartial(id, dto);
    }

    @Put(':id')
    async update(
        @ParamId() id: number,
        @Body() dto: UpdatePutEspecialidadeDto,
    ) {
        return this.especialidadeService.update(id, dto);
    }

    @Delete(':id')
    async delete(@ParamId() id: number) {
        return this.especialidadeService.delete(id);
    }
}
