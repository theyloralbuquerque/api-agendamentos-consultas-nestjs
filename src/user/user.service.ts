import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDto } from './dtos/updatePutUser.dto';
import { UpdatePatchUserDto } from './dtos/updatePatchUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(data: CreateUserDto) {
        const salt = await bcrypt.hash(data.password, await bcrypt.genSalt());

        data.password = await bcrypt.hash(data.password, salt);

        return this.prismaService.user.create({
            data,
        });
    }

    async listAllUsers() {
        return this.prismaService.user.findMany();
    }

    async getUserById(id: number) {
        if (
            !(await this.prismaService.user.count({
                where: {
                    id,
                },
            }))
        ) {
            throw new HttpException(`Usuário com o ID ${id} não existe.`, 400);
        }

        return this.prismaService.user.findUnique({
            where: {
                id,
            },
        });
    }

    async update(
        id: number,
        { nome, email, password, data_nascimento, role }: UpdatePutUserDto,
    ) {
        if (
            !(await this.prismaService.user.count({
                where: {
                    id,
                },
            }))
        ) {
            throw new HttpException(`Usuário com o ID ${id} não existe.`, 400);
        }

        const salt = await bcrypt.hash(password, await bcrypt.genSalt());

        password = await bcrypt.hash(password, salt);

        return this.prismaService.user.update({
            data: {
                nome,
                email,
                password,
                data_nascimento: data_nascimento
                    ? new Date(data_nascimento)
                    : null,
                role,
            },
            where: {
                id,
            },
            select: {
                id: true,
                nome: true,
                email: true,
            },
        });
    }

    async updatePartial(
        id: number,
        { nome, email, password, data_nascimento, role }: UpdatePatchUserDto,
    ) {
        if (
            !(await this.prismaService.user.count({
                where: {
                    id,
                },
            }))
        ) {
            throw new HttpException(`Usuário com o ID ${id} não existe.`, 400);
        }

        const data: any = {};

        if (data_nascimento) {
            data.data_nascimento = new Date(data_nascimento);
        }
        if (email) {
            data.email = email;
        }
        if (nome) {
            data.nome = nome;
        }
        if (password) {
            const salt = await bcrypt.hash(password, await bcrypt.genSalt());
            data.password = await bcrypt.hash(password, salt);
        }
        if (role) {
            data.role = role;
        }

        data.updated_at = new Date();
        return this.prismaService.user.update({
            data,
            where: {
                id,
            },
        });
    }

    async delete(id: number) {
        const userExistente = await this.prismaService.user.findUnique({
            where: {
                id,
            },
        });

        if (!userExistente) {
            throw new HttpException(`Usuário com o ID ${id} não existe.`, 400);
        }

        return this.prismaService.user.delete({
            where: {
                id,
            },
            select: {
                id: true,
                nome: true,
                email: true,
            },
        });
    }
}
