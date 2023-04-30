import { IsInt, IsNotEmpty, Length, Matches, MaxLength } from "class-validator";

export class CreateVinculdadoDto {

    @IsInt({message: "El numero-tramite debe ser un número entero"})
    tramite_numero: number;

    @Length(1,100,{message: "El apellido debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el apellido."})
    apellido: string;

    @Length(1,100,{message: "El nombre debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el nombre."})
    nombre: string;

    @IsInt({message: "El dni debe ser un número entero."})
    dni: number;

    @IsInt({message: "El id-sexo debe ser un número entero"})
    sexo_id: number;

    @Length(1,100,{message: "El teléfono debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el teléfono."})
    telefono: string;

    @IsInt({message: "El id-categoria debe ser un número entero."})
    categoria_id: number    

}
