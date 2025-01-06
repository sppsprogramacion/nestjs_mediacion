import { Module } from '@nestjs/common';
import { ProvinciasService } from './provincias.service';
import { ProvinciasController } from './provincias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provincia } from './entities/provincia.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({ 
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Provincia
    ])
  ],
  controllers: [ProvinciasController],
  providers: [ProvinciasService]
})
export class ProvinciasModule {}
