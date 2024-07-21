import { Module } from '@nestjs/common';
import { AgendamentoController } from './agendamento.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AgendamentoService } from './agendamento.service';

@Module({
    imports: [PrismaModule],
    controllers: [AgendamentoController],
    providers: [AgendamentoService],
})
export class AgendamentoModule {}
