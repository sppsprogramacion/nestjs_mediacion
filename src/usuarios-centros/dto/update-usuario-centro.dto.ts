import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioCentroDto } from './create-usuario-centro.dto';

export class UpdateUsuarioCentroDto extends PartialType(CreateUsuarioCentroDto) {}
