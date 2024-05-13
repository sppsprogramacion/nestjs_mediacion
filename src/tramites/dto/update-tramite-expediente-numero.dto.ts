import { IsBoolean, IsInt, Length } from "class-validator";


export class UpdateTramiteExpedienteDto {
        
    es_expediente: boolean;
    
    fecha_expediente: Date;
    
    expediente_anio: number;
    
    expediente_numero: number;

    expediente: string;

    estado_tramite_id: number;
    
            
}