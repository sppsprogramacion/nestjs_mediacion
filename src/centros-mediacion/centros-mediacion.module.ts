import { Module } from '@nestjs/common';
import { CentrosMediacionService } from './centros-mediacion.service';
import { CentrosMediacionController } from './centros-mediacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CentroMediacion } from './entities/centro-mediacion.entity';
import { Departamento } from 'src/departamentos/entities/departamento.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      CentroMediacion,
      Departamento
    ])
  ],
  controllers: [CentrosMediacionController],
  providers: [CentrosMediacionService]
})
export class CentrosMediacionModule {}
