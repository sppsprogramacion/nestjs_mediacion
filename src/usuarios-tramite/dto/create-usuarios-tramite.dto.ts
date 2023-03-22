import { IsDateString, IsEmpty, IsInt, IsNotEmpty, Length } from "class-validator";



export class CreateUsuariosTramiteDto {

    @IsInt({message: "El tramite-numero debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el número-tramite."})
    tramite_numero: number;

    @IsInt({message: "El usuario-id debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el id-usuario."})
    usuario_id: number
   
    @Length(1,200,{message: "El detalle debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el detalle."})
    detalles: string;
    
    @IsEmpty({message: "No debe enviar el campo fecha asignacion."})
    fecha_asignacion: Date;

    @IsEmpty({message: "No debe enviar el campo fecha sece."})
    fecha_sece: Date;
    
    @IsInt({message: "El tramite-funcion-id debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el tramite-funcion-id."})
    funcion_tramite_id

    @IsEmpty({message: "No debe enviar el campo activo."})
    activo: boolean;
}
