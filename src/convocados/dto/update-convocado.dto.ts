import { PartialType } from '@nestjs/mapped-types';
import { CreateConvocadoDto } from './create-convocado.dto';

export class UpdateConvocadoDto extends PartialType(CreateConvocadoDto) {}
