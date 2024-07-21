import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMedicoEspecialidadeDto {
    @IsNumber()
    @IsNotEmpty()
    medico_id: number;

    @IsNumber()
    @IsNotEmpty()
    especialidade_id: number;
}
