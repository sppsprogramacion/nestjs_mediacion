import { IsEmpty, IsInt, IsNotEmpty, IsOptional, Length, Matches, MaxLength, Min } from "class-validator";

export class CreateConvocadoPersonaJuridicaDto {
    
    @IsEmpty({message: "El id_convocado no debe ser enviado."})
    id_convocado: number;

    @Length(1,100,{message: "La razon social debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar la razon_social."})
    razon_social: string;

    sexo_id: number;
    
    isPersonaJuridica: boolean;
}
