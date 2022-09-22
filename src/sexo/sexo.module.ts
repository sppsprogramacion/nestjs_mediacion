import { Module } from '@nestjs/common';
import { SexoService } from './sexo.service';
import { SexoController } from './sexo.controller';

@Module({
  controllers: [SexoController],
  providers: [SexoService]
})
export class SexoModule {}
