import { IsNotEmpty, Length } from "class-validator";

export class CreateVarianteDto {

    @Length(2,100,{message: "La variante debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar la variante."})
    variante: string;
}
