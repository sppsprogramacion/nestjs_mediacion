import { IsDateString, IsEmpty, IsInt, IsNotEmpty, IsOptional, Length, MaxLength } from "class-validator";



export class CreateUsuariosTramiteDto {

    @IsInt({message: "El tramite_numero debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el tramite_numeroxxx."})
    tramite_numero: number;

    @IsInt({message: "El usuario_id debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el usuario_id."})
    usuario_id: number
   
    @MaxLength(300,{message: "detalles debe tener hasta $constraint1 caracteres."})
    @IsOptional()
    detalles: string;
    
    @IsEmpty({message: "No debe enviar el campo fecha_asignacion."})
    fecha_asignacion: Date;

    @IsEmpty({message: "No debe enviar el campo fecha_sece."})
    fecha_sece: Date;
    
    @IsInt({message: "El funcion_tramite_id debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el funcion_tramite_id."})
    funcion_tramite_id: number;

    // @IsEmpty({message: "No debe enviar el campo activo."})
    // activo: boolean;
}
