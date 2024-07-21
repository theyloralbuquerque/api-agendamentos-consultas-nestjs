import { forwardRef, Module } from '@nestjs/common';
import { EspecialidadeController } from './especialidade.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { EspecialidadeService } from './especialidade.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [PrismaModule, forwardRef(() => AuthModule), UserModule],
    controllers: [EspecialidadeController],
    providers: [EspecialidadeService],
})
export class EspecialidadeModule {}
