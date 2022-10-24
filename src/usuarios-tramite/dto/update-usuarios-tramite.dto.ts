import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuariosTramiteDto } from './create-usuarios-tramite.dto';

export class UpdateUsuariosTramiteDto extends PartialType(CreateUsuariosTramiteDto) {}
