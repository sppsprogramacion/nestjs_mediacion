import { Module } from '@nestjs/common';
import { SexoService } from './sexo.service';
import { SexoController } from './sexo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sexo } from './entities/sexo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
  TypeOrmModule.forFeature([
    Sexo
  ])
],
  controllers: [SexoController],
  providers: [SexoService]
})
export class SexoModule {}
