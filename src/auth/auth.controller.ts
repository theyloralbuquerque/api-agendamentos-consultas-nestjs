import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthLoginDto } from './dtos/authLogin.dto';
import { AuthRegisterDto } from './dtos/authRegister.dto';
import { AuthForgetDto } from './dtos/authForget.dto';
import { AuthResetDto } from './dtos/authReset.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Post('login')
    async login(@Body() { email, password }: AuthLoginDto) {
        return this.authService.login(email, password);
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDto) {
        return this.authService.register(body);
    }

    @Post('forget')
    async forget(@Body() { email }: AuthForgetDto) {
        return this.authService.forget(email);
    }

    @Post('reset')
    async reset(@Body() { password, token }: AuthResetDto) {
        return this.authService.reset(password, token);
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User() user) {
        return { user };
    }
}
