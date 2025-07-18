import { PartialType } from '@nestjs/mapped-types';
import { CreateConvocadoSaltaDto } from './create-convocado-salta.dto';
import { IsInt, IsNotEmpty, Length } from 'class-validator';

export class UpdateConvocadoDto {

    @Length(1,100,{message: "El apellido debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el apellido."})
    apellido: string;

    @Length(1,100,{message: "El nombre debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el nombre."})
    nombre: string;
    
    @IsInt({message: "El dni debe ser un número entero."})
    dni: number;

    @IsInt({message: "El sexo_id debe ser un número entero"})
    sexo_id: number;
}
