import { Module } from '@nestjs/common';
import { FuncionTramiteService } from './funcion-tramite.service';
import { FuncionTramiteController } from './funcion-tramite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionTramite } from './entities/funcion-tramite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FuncionTramite
    ])
  ],
  controllers: [FuncionTramiteController],
  providers: [FuncionTramiteService]
})
export class FuncionTramiteModule {}
