import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

interface IUser{
  "user": string;
  "password": string;
}


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  

  @Post('login')
  async login(
    @Body()
    data: IUser
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
}
