import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicoDto } from './createMedico.dto';

export class UpdatePatchMedicoDto extends PartialType(CreateMedicoDto) {}
