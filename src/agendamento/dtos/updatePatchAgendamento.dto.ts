import { IsOptional, IsNumber } from 'class-validator';

export class UpdatePatchAgendamentoDto {
    @IsOptional()
    @IsNumber()
    id_paciente?: number;
}
