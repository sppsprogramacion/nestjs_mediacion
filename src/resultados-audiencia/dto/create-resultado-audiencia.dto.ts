import { IsNotEmpty, Length } from "class-validator";

export class CreateResultadoAudienciaDto {

    @Length(2,100,{message: "El resultado de audiencia debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el resultado audiencia."})
    resultado_audiencia: string;
}
