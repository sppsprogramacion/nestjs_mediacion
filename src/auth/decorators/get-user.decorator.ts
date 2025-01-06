
import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";


//todo lo que retorna este decorador se refleja al utilizar este decorador en el controlador
export const GetUser = createParamDecorator(
    ( data: string, ctx: ExecutionContext) => {
        //data son los parametros solicitados en el controlador atarves del decorador personalizado... @GetUser(['email','apellido']) user: Usuario
        //ExecutionContext el contexto donde se realiza la peticion... de ahi puedo obtener la request
       
        //obtengo la request del contexto
        const req = ctx.switchToHttp().getRequest();
        //obtengo el usuario de la request
        const user = req.user;


        if( !user ){
            throw new InternalServerErrorException("User not found (request)");
        }
       
        //devuelve el usuario o la data especificada (ej. mail, apellido)
        return ( !data )? user : user[data];
    }
);
