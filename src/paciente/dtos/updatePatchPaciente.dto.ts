import { PartialType } from '@nestjs/mapped-types';
import { CreatePacienteDto } from './createPaciente.dto';

export class UpdatePatchPacienteDto extends PartialType(CreatePacienteDto) {}
