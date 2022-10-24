import { IsEmpty, IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class CreateProvinciaDto {    
    
    @Length(2,100,{message: "La provincia debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar la provincia."})
    provincia: string;
}
