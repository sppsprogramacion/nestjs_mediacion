import { Module } from '@nestjs/common';
import { ConvocadosService } from './convocados.service';
import { ConvocadosController } from './convocados.controller';

@Module({
  controllers: [ConvocadosController],
  providers: [ConvocadosService]
})
export class ConvocadosModule {}
