import { Module } from '@nestjs/common';
import { VariantesService } from './variantes.service';
import { VariantesController } from './variantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variante } from './entities/variante.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Variante
    ])
  ],
  controllers: [VariantesController],
  providers: [VariantesService]
})
export class VariantesModule {}
