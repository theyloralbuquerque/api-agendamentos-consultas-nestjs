import { forwardRef, Module } from '@nestjs/common';
import { AgendamentoController } from './agendamento.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AgendamentoService } from './agendamento.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [PrismaModule, forwardRef(() => AuthModule), UserModule],
    controllers: [AgendamentoController],
    providers: [AgendamentoService],
})
export class AgendamentoModule {}
