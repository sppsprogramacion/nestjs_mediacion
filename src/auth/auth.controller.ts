import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Req()
    req: Request
    ) {
      try {
        // return {
        //  "usuario" : req.query.user,
        //  "clave": req.query.password

        // }
        return this.authService.loginService(req.query.user.toString(), req.query.password.toString());
        
      } 
      catch (error) {
        throw new BadRequestException(error.message)
      }
  }
}
