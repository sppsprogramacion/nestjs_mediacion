import { IsDateString, IsEmpty, IsInt, IsNotEmpty, Length } from "class-validator";

export class CreateUsuarioCentroDto {
    
    @IsInt({message: "El id del centro de mediacón debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el id del centro de mediacón."})
    centro_mediacion_id: number;

    @IsInt({message: "El id-usuario debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el id-usuario."})
    usuario_id: number
   
    @Length(1,200,{message: "El detalle debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el detalle."})
    detalles: string;
    
    // @IsDateString({message: "El formato de fecha ingresada no es válida."})
    fecha_designacion: Date;
    
    @IsEmpty({message: "No debe enviar el campo activo."})
    activo: boolean;
}
