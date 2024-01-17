import { PartialType } from '@nestjs/mapped-types';
import { CreateResultadoAudienciaDto } from './create-resultado-audiencia.dto';

export class UpdateResultadoAudienciaDto extends PartialType(CreateResultadoAudienciaDto) {}
