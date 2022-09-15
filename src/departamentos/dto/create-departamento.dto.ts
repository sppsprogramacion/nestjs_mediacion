import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateDepartamentoDto {

    @IsNotEmpty({message: "Debe ingresar el departamento."})
    @Length(1,100,{message: "El departamento debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsString({message: "El departamento debe ser formado por texto."})
    departamento: string;
}
