import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from '../usuario/usuario.module';
import { CiudadanosService } from '../ciudadanos/ciudadanos.service';
import { CiudadanosModule } from '../ciudadanos/ciudadanos.module';

@Module({
  imports: [UsuarioModule,CiudadanosModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
