import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartamentoDto } from './create-departamento.dto';

export class UpdateDepartamentoDto extends PartialType(CreateDepartamentoDto) {

    tiene_centro_mediacion: boolean;
}
