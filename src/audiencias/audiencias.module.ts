import { Module } from '@nestjs/common';
import { AudienciasService } from './audiencias.service';
import { AudienciasController } from './audiencias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audiencia } from './entities/audiencia.entity';
import { Tramite } from '../tramites/entities/tramite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Audiencia,
      Tramite
    ])
  ],
  controllers: [AudienciasController],
  providers: [AudienciasService]
})
export class AudienciasModule {}
