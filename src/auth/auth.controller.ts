import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException, ParseIntPipe, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { LoginCiudadanoDto } from './dto/login-ciudadano.dto';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}  

  @Post('login')
  async login(
    @Body()
    loginCiudadanoDto: LoginCiudadanoDto
    
    ) {
      try {
        
        return this.authService.loginService(loginCiudadanoDto);
      } 
      catch (error) {
        throw new BadRequestException(error.message)
      }
  }


  @Post('login2')
  async login2(
    @Body()
    loginCiudadanoDto: LoginCiudadanoDto

    ) {
      try {
        return this.authService.loginService(loginCiudadanoDto);
        
      } 
      catch (error) {
        throw new BadRequestException(error.message)
      }
  }


}
