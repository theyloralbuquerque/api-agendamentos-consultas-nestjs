import {
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreateEspecialidadeDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsNumber()
    @IsNotEmpty()
    codigo: number;

    @IsString()
    @IsIn(['A', 'I'])
    @MaxLength(1)
    @IsNotEmpty()
    status: string;
}
