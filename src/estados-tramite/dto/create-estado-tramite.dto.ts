import { IsNotEmpty, Length } from "class-validator";


export class CreateEstadoTramiteDto {

    @Length(2,100,{message: "El estado de tramite debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el estado de tramite."})
    estado_tramite: string;
}
