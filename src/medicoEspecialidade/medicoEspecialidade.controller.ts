import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { MedicoEspecialidadeService } from './medicoEspecialidade.service';
import { CreateMedicoEspecialidadeDto } from './dtos/createMedicoEspecialidade.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.Admin, Role.User)
@Controller('medico-especialidade')
export class MedicoEspecialidadeController {
    constructor(
        private readonly medicoEspecialidadeService: MedicoEspecialidadeService,
    ) {}

    @Get()
    findAll() {
        return this.medicoEspecialidadeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.medicoEspecialidadeService.findOne(+id);
    }

    @Post()
    create(@Body() createMedicoEspecialidadeDto: CreateMedicoEspecialidadeDto) {
        return this.medicoEspecialidadeService.create(
            createMedicoEspecialidadeDto,
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.medicoEspecialidadeService.delete(+id);
    }
}
