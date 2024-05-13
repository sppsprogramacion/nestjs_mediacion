import { IsInt, Length } from "class-validator";


export class UpdateTramiteFinalizacionDto {
        
    fecha_finalizacion: Date;

    estado_tramite_id: number;

    @Length(1,1000,{message: "La observacion del resultado debe tener entre $constraint1 y $constraint2 caracteres."})
    observacion_finalizacion: string;

        
}