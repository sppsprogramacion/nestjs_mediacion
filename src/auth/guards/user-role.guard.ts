import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/usuario/entities/usuario.entity';

// @Injectable()
// export class UserRoleGuard implements CanActivate {

//   constructor(
//     private readonly reflector: Reflector //puedo ver informacion de los decoradores y de la metadata
//   ){}


//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {


//     //obtener metadata del controlador, obtiene los roles( @SetMetadata ('roles', ['admin','superadmin']) )
//     //roles (se cambia por META_ROLES) es el nombre de la metadata... context.getHandler() es el target
//     //META_ROLES son los roles establecidos como validos para la ruta
//     const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler() )


//     //obtener usuario de la request
//     const req = context.switchToHttp().getRequest();
//     const user = req.user as Usuario;


//     if ( !user )
//       throw new BadRequestException ("Usuario no encontrado");


//     //validacion si el rol del usuario es parte de los roles establecidos como validos para la ruta
//     if(validRoles.includes( user.rol_id )){
//       return true;
//     }


//     //cuando el usuario no tiene un rol valido para la ruta
//     throw new ForbiddenException(
//       `User ${ user.apellido + " " + user.nombre } necesita un rol valido. ${validRoles}`
//     )
   
//   }

// }
