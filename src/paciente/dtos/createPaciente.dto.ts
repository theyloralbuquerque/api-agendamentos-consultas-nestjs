import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePacienteDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    cpf: string;

    @IsNumber()
    @IsNotEmpty()
    numero_carteirinha: number;
}
