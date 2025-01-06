import { PartialType } from '@nestjs/mapped-types';
import { CreateCentroMediacionDto } from './create-centro-mediacion.dto';
import { IsBoolean } from 'class-validator';

export class UpdateCentroMediacionDto extends PartialType(CreateCentroMediacionDto) {

    @IsBoolean({message: "activo debe ser verdadero o falso"})
    activo: boolean;
}
