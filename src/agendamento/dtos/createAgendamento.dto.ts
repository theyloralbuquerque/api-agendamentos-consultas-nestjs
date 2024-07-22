import { IsNotEmpty } from 'class-validator';

export class CreateAgendamentoDto {
    @IsNotEmpty()
    data_inicial: string;

    @IsNotEmpty()
    data_final: string;

    @IsNotEmpty()
    duracao_consulta: number;

    @IsNotEmpty()
    id_medico: number;

    @IsNotEmpty()
    id_especialidade: number;
}
