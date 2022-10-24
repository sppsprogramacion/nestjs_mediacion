import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CiudadanosService } from '../ciudadanos/ciudadanos.service';

@Injectable()
export class AuthService {
  
  constructor(
    private readonly userService: UsuarioService,
    private readonly ciudadanoService: CiudadanosService,
  ){}

  async validateUser(user: string, pass: string){
      let valueDni: number = parseInt(user);
      console.log("dniuser", valueDni);
      const res = await this.ciudadanoService.findXDni(valueDni);
      console.log(res);
      if(res && (res.clave == pass)){
        return res;
      }
      return null;
  }

  async loginService(user: string, pass: string){
    console.log("user", user);
    console.log("clave", pass);
    let res = null;
    try{
      res = await this.validateUser(user, pass);
      if(!res){
        throw new UnauthorizedException("El usuario o la contraseña no coinciden");        
      }else{
        return res;
      }
    }catch(e){
      throw new BadRequestException(e);
      
    }
  }

}
