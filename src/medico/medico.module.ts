import { forwardRef, Module } from '@nestjs/common';
import { MedicoController } from './medico.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MedicoService } from './medico.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [PrismaModule, forwardRef(() => AuthModule), UserModule],
    controllers: [MedicoController],
    providers: [MedicoService],
    exports: [MedicoService],
})
export class MedicoModule {}
