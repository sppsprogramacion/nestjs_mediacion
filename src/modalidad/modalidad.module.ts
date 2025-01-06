import { Module } from '@nestjs/common';
import { ModalidadService } from './modalidad.service';
import { ModalidadController } from './modalidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modalidad } from './entities/modalidad.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Modalidad
    ])
  ],
  controllers: [ModalidadController],
  providers: [ModalidadService]
})
export class ModalidadModule {}
