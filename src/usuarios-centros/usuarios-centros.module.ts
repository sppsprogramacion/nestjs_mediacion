import { Module } from '@nestjs/common';
import { UsuariosCentrosService } from './usuarios-centros.service';
import { UsuariosCentrosController } from './usuarios-centros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioCentro } from './entities/usuario-centro.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsuarioCentro
    ])
  ],
  controllers: [UsuariosCentrosController],
  providers: [UsuariosCentrosService]
})
export class UsuariosCentrosModule {}
