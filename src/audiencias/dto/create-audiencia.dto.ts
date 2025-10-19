import { IsDateString, IsInt, IsString, Length, MaxLength, IsOptional, Matches } from 'class-validator';

export class CreateAudienciaDto {

    num_audiencia: number;

    @IsInt({message: "El tramite_numero debe ser un número entero."})
    tramite_numero: number;

    @MaxLength(300,{message: "El detalle debe tener hasta $constraint1 caracteres."})
    @IsOptional()
    detalles: string;
   
    @IsDateString({message: "El formato de la fecha de inicio ingresada no es válida."})
    fecha_inicio: Date;
   
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {message: 'La hora de inicio no es válida. Recuerde tambien que debe tener el formato HH:mm:ss (por ejemplo, 14:59:59 , 15:00:01).',})
    hora_inicio: string;
    
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {message: 'La hora de fin no es válida. Recuerde tambien que debe tener el formato HH:mm:ss (por ejemplo, 14:59:59 , 15:00:01).',})
    hora_fin: string;      
   
    @IsInt({message: "El tipo_audiencia_id debe ser un número entero."})
    tipo_audiencia_id: number;   
   
    @IsInt({message: "La modalidad_id debe ser un número entero."})
    modalidad_id: number;
   
    @IsInt({message: "El centro_mediacion_id debe ser un número entero."})
    centro_mediacion_id: number;
   
    @IsInt({message: "El usuario_id debe ser un número entero."})
    usuario_id: number

    fecha_creacion: Date;

}
  

   
    