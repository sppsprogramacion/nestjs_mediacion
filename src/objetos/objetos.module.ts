import { Module } from '@nestjs/common';
import { ObjetosService } from './objetos.service';
import { ObjetosController } from './objetos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Objeto } from './entities/objeto.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Objeto
    ])
  ],
  controllers: [ObjetosController],
  providers: [ObjetosService]
})
export class ObjetosModule {}
