import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDto } from './dtos/authRegister.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private issuer = 'login';
    private audience = 'users';

    constructor(
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
    ) {}

    createToken(user: User) {
        return {
            accessToken: this.jwtService.sign(
                {
                    id: user.id,
                    nome: user.nome,
                    email: user.email,
                },
                {
                    expiresIn: '7 days',
                    subject: String(user.id),
                    issuer: this.issuer,
                    audience: this.audience,
                },
            ),
        };
    }

    checkToken(token: string) {
        try {
            const data = this.jwtService.verify(token, {
                issuer: this.issuer,
                audience: this.audience,
            });

            return data;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    isValidToken(token: string) {
        try {
            this.checkToken(token);
        } catch (e) {
            return false;
        }
    }

    async login(email: string, password: string) {
        const user = await this.prismaService.user.findFirst({
            where: {
                email,
            },
        });

        if (!user) {
            throw new UnauthorizedException('E-mail e/ou senha incorretos.');
        }

        if (!(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('E-mail e/ou senha incorretos.');
        }

        return this.createToken(user);
    }

    async forget(email: string) {
        const user = await this.prismaService.user.findFirst({
            where: {
                email,
            },
        });

        if (!user) {
            throw new UnauthorizedException('E-mail está incorreto.');
        }

        // TO DO: enviar o email

        return this.createToken(user);
    }

    async reset(password: string, token: string) {
        // TO DO: validar o token

        const id = 0;

        const user = await this.prismaService.user.update({
            where: {
                id,
            },
            data: {
                password,
            },
        });

        return this.createToken(user);
    }

    async register(data: AuthRegisterDto) {
        const user = await this.userService.create(data);

        return this.createToken(user);
    }
}
