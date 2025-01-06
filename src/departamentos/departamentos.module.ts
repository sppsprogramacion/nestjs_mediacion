import { Module } from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { DepartamentosController } from './departamentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departamento } from './entities/departamento.entity';
import { CentroMediacion } from 'src/centros-mediacion/entities/centro-mediacion.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Departamento,
      CentroMediacion
    ])
  ],
  controllers: [DepartamentosController],
  providers: [DepartamentosService]
})
export class DepartamentosModule {}
