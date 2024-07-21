import {
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateMedicoDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(2)
    @MinLength(2)
    uf: string;

    @IsNumber()
    @IsNotEmpty()
    numero_crm: number;
}
