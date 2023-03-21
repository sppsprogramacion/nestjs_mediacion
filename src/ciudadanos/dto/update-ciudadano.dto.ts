import { PartialType } from '@nestjs/mapped-types';
import { IsEmpty, IsNotEmpty } from 'class-validator';
import { CreateCiudadanoDto } from './create-ciudadano.dto';

export class UpdateCiudadanoDto extends PartialType(CreateCiudadanoDto) {
    
    @IsNotEmpty({message: "property clave should not exist"})  
    @IsEmpty({message: "property clave should not exist"})
    clave: string;
    
}
