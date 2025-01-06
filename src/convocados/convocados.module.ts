import { Module } from '@nestjs/common';
import { ConvocadosService } from './convocados.service';
import { ConvocadosController } from './convocados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Convocado } from './entities/convocado.entity';
import { Tramite } from 'src/tramites/entities/tramite.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Convocado,
      Tramite
    ])
  ],
  controllers: [ConvocadosController],
  providers: [ConvocadosService]
})
export class ConvocadosModule {}
