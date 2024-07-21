import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicoEspecialidadeDto } from './createMedicoEspecialidade.dto';

export class UpdatePatchMedicoEspecialidadeDto extends PartialType(
    CreateMedicoEspecialidadeDto,
) {}
