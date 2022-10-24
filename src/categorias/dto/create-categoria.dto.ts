import { IsNotEmpty, Length } from "class-validator";

export class CreateCategoriaDto {
    @Length(2,100,{message: "El registro de categoría debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar la categoría."})
    categoria: string;
}
