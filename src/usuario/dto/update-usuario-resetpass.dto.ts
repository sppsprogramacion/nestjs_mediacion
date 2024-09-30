import { PartialType } from '@nestjs/mapped-types';
import { IsString, Length, Matches } from 'class-validator';

export class UpdateUsuarioResetPassDto {
    
    @IsString()
    @Length(8,16,{message: "La clave debe tener entre $constraint1 y $constraint2 caracteres."})    
    clave: string;
    
}
