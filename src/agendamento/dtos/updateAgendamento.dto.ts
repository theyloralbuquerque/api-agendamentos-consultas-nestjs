import { IsOptional, IsDateString, IsInt } from 'class-validator';

export class UpdateAgendamentoDto {
    @IsOptional()
    @IsInt()
    id_medico?: number;

    @IsOptional()
    @IsInt()
    id_especialidade?: number;

    @IsOptional()
    @IsDateString()
    data_agenda?: Date;

    @IsOptional()
    @IsDateString()
    hora?: Date;
}
