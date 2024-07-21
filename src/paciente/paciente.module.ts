import { forwardRef, Module } from '@nestjs/common';
import { PacienteController } from './paciente.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PacienteService } from './paciente.service';
import { PacienteUtilsService } from './pacienteUtils.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [PrismaModule, forwardRef(() => AuthModule), UserModule],
    controllers: [PacienteController],
    providers: [PacienteService, PacienteUtilsService],
})
export class PacienteModule {}
