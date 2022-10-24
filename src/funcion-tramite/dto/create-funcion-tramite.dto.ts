import { IsNotEmpty, Length } from "class-validator";


export class CreateFuncionTramiteDto {

    @Length(2,100,{message: "La funcion en tramite debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar la funcion en tramite."})
    funcion_tramite: string;
}
