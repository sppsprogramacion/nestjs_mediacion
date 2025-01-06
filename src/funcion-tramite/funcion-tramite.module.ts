import { Module } from '@nestjs/common';
import { FuncionTramiteService } from './funcion-tramite.service';
import { FuncionTramiteController } from './funcion-tramite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionTramite } from './entities/funcion-tramite.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      FuncionTramite
    ])
  ],
  controllers: [FuncionTramiteController],
  providers: [FuncionTramiteService]
})
export class FuncionTramiteModule {}
