import { Module } from '@nestjs/common';
import { EstadosTramiteService } from './estados-tramite.service';
import { EstadosTramiteController } from './estados-tramite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoTramite } from './entities/estados-tramite.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      EstadoTramite
    ])
  ],
  controllers: [EstadosTramiteController],
  providers: [EstadosTramiteService]
})
export class EstadosTramiteModule {}
