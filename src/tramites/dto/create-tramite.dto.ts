import { IsBoolean, IsDateString, IsEmpty, IsInt, IsNotEmpty, Length } from "class-validator";


export class CreateTramiteDto {
   
    numero_tramite: number;

    @IsInt({message: "El id-ciudadano debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el id-ciudadano."})
    ciudadano_id:number;

    @IsBoolean({message: "El campo esta asesorado debe ser verdadero o falso"})
    esta_asesorado: boolean;    
    
    fecha_tramite: Date;
    
    es_expediente: boolean;
        
    expediente: string;
    
    fecha_expediente: Date;

    @IsInt({message: "El id del objeto de la mediacón debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el id del objeto de la mdiación."})
    objeto_id: number;

    @IsBoolean({message: "El campo violencia de genero debe ser verdadero o falso"})
    violencia_genero: boolean;

    @IsBoolean({message: "El campo violencia entre partes debe ser verdadero o falso"})
    violencia_partes: boolean;

    @IsBoolean({message: "El campo existe denuncia debe ser verdadero o falso"})
    existe_denuncia: boolean;

    @IsBoolean({message: "El campo medida cautelar debe ser verdadero o falso"})
    medida_cautelar: boolean;

    @IsBoolean({message: "El campo pdf de denuncia debe ser verdadero o falso"})
    pdf_denuncia: boolean;

    @IsBoolean({message: "El campo pdf de cautelar debe ser verdadero o falso"})
    pdf_cautelar: boolean;

    @IsBoolean({message: "El campo pdf de ingresos debe ser verdadero o falso"})
    pdf_ingresos: boolean;

    @IsBoolean({message: "El campo pdf de negativa debe ser verdadero o falso"})
    pdf_negativa: boolean;

    @IsInt({message: "El id de la modalidad debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el id de la modalidad."})
    modalidad_id: number;

    @IsInt({message: "El id de la variante debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el id de la variante."})
    variante_id: number;

    estado_tramite_id: number;   
    

    fecha_finalizacion: Date;
}
