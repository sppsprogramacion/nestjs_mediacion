import { Module } from '@nestjs/common';
import { UsuariosTramiteService } from './usuarios-tramite.service';
import { UsuariosTramiteController } from './usuarios-tramite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosTramite } from './entities/usuarios-tramite.entity';
import { TramitesModule } from '../tramites/tramites.module';
import { Tramite } from '../tramites/entities/tramite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsuariosTramite,
      Tramite
    ]),
    TramitesModule
  ],
  controllers: [UsuariosTramiteController],
  providers: [UsuariosTramiteService]
})
export class UsuariosTramiteModule {}
