import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Audiencia } from 'src/audiencias/entities/audiencia.entity';
import { Tramite } from '../tramites/entities/tramite.entity';
import { TramitesModule } from '../tramites/tramites.module';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { UsuariosTramite } from './entities/usuarios-tramite.entity';
import { UsuariosTramiteController } from './usuarios-tramite.controller';
import { UsuariosTramiteService } from './usuarios-tramite.service';
import { AudienciasService } from '../audiencias/audiencias.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Audiencia,
      Tramite,
      Usuario,
      UsuariosTramite,
    ]),
    TramitesModule
  ],
  controllers: [UsuariosTramiteController],
  providers: [AudienciasService,UsuariosTramiteService, UsuarioService]
})
export class UsuariosTramiteModule {}
