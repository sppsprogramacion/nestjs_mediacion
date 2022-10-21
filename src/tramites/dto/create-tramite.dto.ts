import { IsDateString, IsInt, IsNotEmpty, Length } from "class-validator";


export class CreateTramiteDto {
   
    
    esta_asesorado: boolean;
    
    @IsDateString({message: "El formato de fecha de tramite ingresada no es válida."})
    fecha_tramite: Date;

    
    es_expediente: boolean;

    @Length(1,50,{message: "El expediente debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el expediente."})
    expediente: string;

    @IsDateString({message: "El formato de fecha de expediente ingresada no es válida."})
    fecha_expediente: Date;

    @IsInt({message: "El id del objeto de la mediacón debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el id del objeto de la mdiación."})
    objeto_id: number;

    
    violencia_genero: boolean;

 
    violencia_partes: boolean;


    existe_denuncia: boolean;


    medida_cautelar: boolean;


    pdf_denuncia: boolean;


    pdf_cautelar: boolean;


    pdf_ingresos: boolean;


    pdf_negativa: boolean;

    @IsInt({message: "El id de la modalidad debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el id de la modalidad."})
    modalidad_id: number;

    @IsInt({message: "El id de la variante debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el id de la variante."})
    variante_id: number;
    //FIN VARIANTE............................
}
