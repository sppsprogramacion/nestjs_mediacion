import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CiudadanosService } from '../ciudadanos/ciudadanos.service';
import { LoginCiudadanoDto } from './dto/login-ciudadano.dto';

@Injectable()
export class AuthService {
  
  constructor(
    private readonly userService: UsuarioService,
    private readonly ciudadanoService: CiudadanosService,
  ){}

  async validateUser(ciudadano_dni: number, pass: string){
      //let valueDni: number = parseInt(user);
      console.log("dniuser", ciudadano_dni);
      const res = await this.ciudadanoService.findXDni(ciudadano_dni);
      console.log(res);
      if(res && (res.clave == pass)){
        return res;
      }
      return null;
  }

  async loginService(loginCiudadano: LoginCiudadanoDto){
    console.log("user", loginCiudadano.dni);
    console.log("clave", loginCiudadano.clave);
    let res = null;
    try{
      res = await this.validateUser(loginCiudadano.dni, loginCiudadano.clave);
      if(!res){
        throw new UnauthorizedException("El dni o la contraseña no coinciden");        
      }else{
        return res;
      }
    }catch(e){
      throw new BadRequestException(e);
      
    }
  }

}
