import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoAudienciaDto } from './create-tipo-audiencia.dto';

export class UpdateTipoAudienciaDto extends PartialType(CreateTipoAudienciaDto) {}
