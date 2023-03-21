import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { IsEmpty, IsNotEmpty, Validate } from 'class-validator';
import { CreateCiudadanoDto } from './create-ciudadano.dto';

export class UpdateCiudadanoDto extends PartialType(CreateCiudadanoDto) {
    
    
    
    @IsNotEmpty({message: "property claves should not exist-vacia"})  
    @IsEmpty({message: "property claves should not exist- dato"})
    clave: string;
    
}
