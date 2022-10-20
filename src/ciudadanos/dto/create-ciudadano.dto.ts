import { IsDateString, IsInt, IsNotEmpty, Length, Matches, MaxLength } from "class-validator";

export class CreateCiudadanoDto {

    @IsInt({message: "El dni debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el dni."})
    dni: number;

    @Length(1,100,{message: "El apellido debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el apellido."})
    apellido: string;

    @Length(1,100,{message: "El nombre debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el nombre."})
    nombre: string;

    @IsInt({message: "El id de sexo debe ser un número entero"})
    @IsNotEmpty({message: "Debe ingresar el id de sexo."})
    sexo_id: number;

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

    @MaxLength(100,{message: "La calle/direccion debe tener hasta $constraint1 caracteres."})
    calle_direccion: string;
    
    @IsInt({message: "El numero de domicilio debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el numero de domicilio."})
    numero_dom: number;
    
    @Length(1,100,{message: "El teléfono debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el teléfono."})
    telefono: string;

    @IsDateString({message: "El formato de fecha ingresada no es válida."})
    fecha_nac: Date;

    @Matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,{message:'El formato del email no es válido'})
    @Length(1,200,{message: "El correo debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el correo."})
    email:string;

    @Length(1,100,{message: "La clave debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar la clave."})
    clave: string;
}
