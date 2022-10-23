import { Module } from '@nestjs/common';
import { EstadosTramiteService } from './estados-tramite.service';
import { EstadosTramiteController } from './estados-tramite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoTramite } from './entities/estados-tramite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EstadoTramite
    ])
  ],
  controllers: [EstadosTramiteController],
  providers: [EstadosTramiteService]
})
export class EstadosTramiteModule {}
