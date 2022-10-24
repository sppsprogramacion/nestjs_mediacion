import { PartialType } from '@nestjs/mapped-types';
import { CreateFuncionTramiteDto } from './create-funcion-tramite.dto';

export class UpdateFuncionTramiteDto extends PartialType(CreateFuncionTramiteDto) {}
