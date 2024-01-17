import { IsInt, Length } from "class-validator";


export class UpdateAudienciaResultadoDto {
    
    @IsInt({message: "El resultado_audiencia_id debe ser un número entero."})
    resultado_audiencia_id: number;


    @Length(1,300,{message: "La observacion del resultado debe tener entre $constraint1 y $constraint2 caracteres."})
    observacion_resultado: string;

    esta_cerrada: boolean;
    
}