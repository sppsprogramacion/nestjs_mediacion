import { Rol } from "src/roles/entities/role.entity";
import { Sexo } from "src/sexo/entities/sexo.entity";



export interface UsuarioGeneral {
    
    id_usuario: number;
   
    dni: number;
    
    apellido: string;
    
    nombre: string;

    //SEXO
    sexo_id: number;

    sexo: Sexo;
    //FIN SEXO
   
    telefono: string;
    
    email: string;

    //ROL
    rol_id: string;
    
    rol: Rol;
    //FIN ROL
   
    activo: boolean;

}