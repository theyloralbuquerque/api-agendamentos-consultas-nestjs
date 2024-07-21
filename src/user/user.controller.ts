import {
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdatePatchUserDto } from './dtos/updatePatchUser.dto';
import { UserService } from './user.service';
import { UpdatePutUserDto } from './dtos/updatePutUser.dto';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.Admin)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async read() {
        return this.userService.listAllUsers();
    }

    @Get(':id')
    async readOne(@ParamId() id: number) {
        return this.userService.getUserById(id);
    }

    @Post()
    async create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Put(':id')
    async update(@ParamId() id: number, @Body() dto: UpdatePutUserDto) {
        return this.userService.update(id, dto);
    }

    @Patch(':id')
    async updatePartial(
        @ParamId() id: number,
        @Body() dto: UpdatePatchUserDto,
    ) {
        return this.userService.updatePartial(id, dto);
    }

    @Delete(':id')
    async delete(@ParamId() id: number) {
        return this.userService.delete(id);
    }
}
