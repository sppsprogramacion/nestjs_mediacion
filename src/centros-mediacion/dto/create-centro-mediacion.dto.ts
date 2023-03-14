import { IsInt, IsNotEmpty, Length, Matches, MaxLength } from "class-validator";

export class CreateCentroMediacionDto {
    @Length(1,100,{message: "Centro de mediación debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el centro de mediación."})
    centro_mediacion: string;   

    @IsInt({message: "El id de departamento debe ser un número entero."})
    departamento_id: number;

    @IsInt({message: "El id de municipio debe ser un número entero."})
    municipio_id: number

    @Length(1,100,{message: "Localidad o barrio debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar la localidad o barrio."})
    localidad_barrio: string;

    @MaxLength(100,{message: "Calle debe tener hasta $constraint1 caracteres."})
    calle_direccion: string;
    
    @IsInt({message: "Número de domicilio debe ser un número entero."})
    numero_dom: number;
    
    @Length(1,100,{message: "Teléfono debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el teléfono."})
    telefono: string;

    @Matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,{message:'El formato del email no es válido'})
    @Length(1,200,{message: "Correo debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el correo."})
    email:string;

}
