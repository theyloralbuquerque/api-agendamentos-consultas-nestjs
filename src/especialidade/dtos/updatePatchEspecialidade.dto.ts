import { PartialType } from '@nestjs/mapped-types';
import { CreateEspecialidadeDto } from './especialidadeCreate.do';

export class UpdatePatchEspecialidadeDto extends PartialType(
    CreateEspecialidadeDto,
) {}
