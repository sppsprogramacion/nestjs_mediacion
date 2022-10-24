import { IsDateString, IsEmpty, IsInt, IsNotEmpty, Length } from "class-validator";



export class CreateUsuariosTramiteDto {

    @IsInt({message: "El id de numero de tramite debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el id del centro de mediacón."})
    tramite_numero: number;

    @IsInt({message: "El dni debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el dni."})
    dni_usuario: number
   
    @Length(1,200,{message: "El detalle debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el detalle."})
    detalles: string;
    
    @IsEmpty({message: "No debe enviar el campo fecha asignacion."})
    fecha_asignacion: Date;

    @IsEmpty({message: "No debe enviar el campo fecha sece."})
    fecha_sece: Date;
    
    @IsInt({message: "El id dela funcion en el tramite debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el id dela funcion en el tramite."})
    funcion_tramite_id

    @IsEmpty({message: "No debe enviar el campo activo."})
    activo: boolean;
}
