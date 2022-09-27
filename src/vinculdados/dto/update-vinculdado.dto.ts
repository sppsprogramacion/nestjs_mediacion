import { PartialType } from '@nestjs/mapped-types';
import { CreateVinculdadoDto } from './create-vinculdado.dto';

export class UpdateVinculdadoDto extends PartialType(CreateVinculdadoDto) {}
