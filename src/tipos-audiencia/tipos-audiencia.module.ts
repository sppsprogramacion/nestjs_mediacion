import { Module } from '@nestjs/common';
import { TiposAudienciaService } from './tipos-audiencia.service';
import { TiposAudienciaController } from './tipos-audiencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoAudiencia } from './entities/tipos-audiencia.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      TipoAudiencia
    ])
  ],
  controllers: [TiposAudienciaController],
  providers: [TiposAudienciaService]
})
export class TiposAudienciaModule {}
