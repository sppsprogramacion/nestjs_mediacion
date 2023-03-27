import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';


interface IUsuario{
  user: string;
  password: string;
}


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  

  @Post('login')
  async login(
    @Body()
    data: IUsuario
    ) {
      try {
        // return {
        //  "usuario" : req.query.user,
        //  "clave": req.query.password

        // }
//        return this.authService.loginService(req.query.user.toString(), req.query.password.toString());
return this.authService.loginService(data.user, data.password);
      } 
      catch (error) {
        throw new BadRequestException(error.message)
      }
  }


  @Post('login2')
  async login2(
    @Body()
    data: IUsuario
    // @Req()
    // req: Request
    ) {
      try {
        // return {
        //  "usuario" : req.query.user,
        //  "clave": req.query.password

        // }
        return this.authService.loginService(data.user.toString(), data.password.toString());
        
      } 
      catch (error) {
        throw new BadRequestException(error.message)
      }
  }


}
