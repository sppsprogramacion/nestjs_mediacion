import { Module } from '@nestjs/common';
import { ConvocadosService } from './convocados.service';
import { ConvocadosController } from './convocados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Convocado } from './entities/convocado.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Convocado
    ])
  ],
  controllers: [ConvocadosController],
  providers: [ConvocadosService]
})
export class ConvocadosModule {}
