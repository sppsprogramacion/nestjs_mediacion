import { Module } from '@nestjs/common';
import { UsuariosTramiteService } from './usuarios-tramite.service';
import { UsuariosTramiteController } from './usuarios-tramite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosTramite } from './entities/usuarios-tramite.entity';
import { TramitesModule } from '../tramites/tramites.module';
import { Tramite } from '../tramites/entities/tramite.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsuariosTramite,
      Tramite,
      Usuario,
    ]),
    TramitesModule
  ],
  controllers: [UsuariosTramiteController],
  providers: [UsuariosTramiteService, UsuarioService]
})
export class UsuariosTramiteModule {}
