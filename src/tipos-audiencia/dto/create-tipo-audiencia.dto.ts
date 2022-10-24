import { IsNotEmpty, Length } from "class-validator";

export class CreateTipoAudienciaDto {

    @Length(2,100,{message: "El registro de tipo de audiencia debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el tipo de audiencia."})
    tipo_audiencia: string;
}
