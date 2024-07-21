import { forwardRef, Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { MedicoEspecialidadeController } from './medicoEspecialidade.controller';
import { MedicoEspecialidadeService } from './medicoEspecialidade.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [PrismaModule, forwardRef(() => AuthModule), UserModule],
    controllers: [MedicoEspecialidadeController],
    providers: [MedicoEspecialidadeService, PrismaService],
})
export class MedicoEspecialidadeModule {}
