import { IsInt, IsNotEmpty, Length, MaxLength } from "class-validator";

export class CreateConvocadoDto {
    @IsInt({message: "El dni debe ser un número entero."})
    dni: number;

    @Length(1,100,{message: "El apellido debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el apellido."})
    apellido: string;

    @Length(1,100,{message: "El nombre debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el nombre."})
    nombre: string;

    @IsInt({message: "El id de provincia debe ser un número entero"})
    @IsNotEmpty({message: "Debe ingresar el id de provincia."})
    provincia_id: number;

    @IsInt({message: "El id de departamento debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el id de departamento."})
    departamento_id: number;

    @IsInt({message: "El id de municipio debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el id de municipio."})
    municipio_id: number

    @Length(1,100,{message: "La localidad o barrio debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar la localidad o barrio."})
    localidad_barrio: string;

    @MaxLength(100,{message: "La calle debe tener hasta $constraint1 caracteres."})
    calle: string;

    @MaxLength(50,{message: "El departamento de domicilio debe tener hasta  $constraint1 caracteres."})
    departamento_dom: string

    @MaxLength(10,{message: "El piso debe tener hasta $constraint1 caracteres."})
    piso: string;

    @IsInt({message: "El numero de domicilio debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el numero de domicilio."})
    numero_dom: number;
    
    @Length(1,100,{message: "El teléfono debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el teléfono."})
    telefono: string;

    @Length(1,200,{message: "El correo debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el correo."})
    correo:string;

}
