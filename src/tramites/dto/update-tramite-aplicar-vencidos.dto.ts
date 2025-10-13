import { IsBoolean, IsInt, Length } from "class-validator";


export class UpdateTramiteAplicarVencidosDto {
    
    @IsInt({message: "La cantidad de dias debe ser un número entero."})
    dias: number;
            
}