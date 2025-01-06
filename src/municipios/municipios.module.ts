import { Module } from '@nestjs/common';
import { MunicipiosService } from './municipios.service';
import { MunicipiosController } from './municipios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipio } from './entities/municipio.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Municipio
    ])
  ],
  controllers: [MunicipiosController],
  providers: [MunicipiosService]
})
export class MunicipiosModule {}
