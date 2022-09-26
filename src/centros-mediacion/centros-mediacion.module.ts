import { Module } from '@nestjs/common';
import { CentrosMediacionService } from './centros-mediacion.service';
import { CentrosMediacionController } from './centros-mediacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CentroMediacion } from './entities/centro-mediacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CentroMediacion
    ])
  ],
  controllers: [CentrosMediacionController],
  providers: [CentrosMediacionService]
})
export class CentrosMediacionModule {}
