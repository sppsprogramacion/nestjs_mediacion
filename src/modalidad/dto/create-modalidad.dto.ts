import { IsNotEmpty, Length } from "class-validator";

export class CreateModalidadDto {

    @Length(2,100,{message: "El modalidad de objeto debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el modalidad."})
    modalidad: string;

}
