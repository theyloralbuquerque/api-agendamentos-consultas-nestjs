import {
    IsDateString,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @IsOptional()
    @IsDateString()
    data_nascimento: string;

    @IsOptional()
    @IsEnum(Role)
    role: number;
}
