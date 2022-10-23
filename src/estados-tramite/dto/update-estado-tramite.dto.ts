import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoTramiteDto } from './create-estado-tramite.dto';

export class UpdateEstadoTramiteDto extends PartialType(CreateEstadoTramiteDto) {}
