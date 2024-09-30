import { IsBoolean, IsInt, IsNotEmpty, Length, Matches } from "class-validator";

export class UpdateUsuarioRolDto {
    
    @Length(1,100,{message: "El rol_id debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el rol_id."})
    rol_id: string;

    
    @IsBoolean({message: "activo debe ser verdadero o falso"})
    activo: boolean;

}