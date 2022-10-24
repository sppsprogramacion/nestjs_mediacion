import { PartialType } from '@nestjs/mapped-types';
import { CreateCentroMediacionDto } from './create-centro-mediacion.dto';

export class UpdateCentroMediacionDto extends PartialType(CreateCentroMediacionDto) {}
