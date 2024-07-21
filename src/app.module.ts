import {
    forwardRef,
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserIdCheckMiddleware } from './middlewares/user-id-check.middleware';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EspecialidadeModule } from './especialidade/especialidade.module';
import { MedicoModule } from './medico/medico.module';
import { PacienteModule } from './paciente/paciente.module';
import { MedicoEspecialidadeModule } from './medicoEspecialidade/medicoEspecialidade.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        forwardRef(() => UserModule),
        forwardRef(() => AuthModule),
        EspecialidadeModule,
        MedicoModule,
        PacienteModule,
        MedicoEspecialidadeModule,
    ],
    controllers: [AppController],
    providers: [AppService],
    exports: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path: 'users/:id',
            method: RequestMethod.ALL,
        });
    }
}
