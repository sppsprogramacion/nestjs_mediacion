import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { LoginCiudadanoDto } from './dto/login-ciudadano.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { Auth } from './entities/auth.entity';
import { AuthGuard } from '@nestjs/passport';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { GetUser } from './decorators/get-user.decorator';
import { Ciudadano } from 'src/ciudadanos/entities/ciudadano.entity';
import { UsuarioGeneral } from './interfaces/usuario-general.interface';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}  

  @Post('login-ciudadano')
  async loginCiudadano(
    @Body() loginCiudadanoDto: LoginCiudadanoDto    

  ) {         
    return this.authService.loginCiudadano(loginCiudadanoDto);
    
  }

  @Post('login-usuario')
  async loginUsuario(
    @Body()
    loginUsuarioDto: LoginUsuarioDto

  ) {
    return this.authService.loginUsuario(loginUsuarioDto);
    
  }

  @Get('check-auth-status-ciudadano')
  @UseGuards( AuthGuard() )
  async checkAuthStatusCiudadano(
    @GetUser() user: UsuarioGeneral
  ){
    
    return this.authService.checkAuthStatusCiudadano(user);

  }

  @Get('check-auth-status-usuario')
  @UseGuards( AuthGuard() )
  async checkAuthStatusUsuario(
    @GetUser() user: Usuario
  ){
    
    return this.authService.checkAuthStatusUsuario(user.id_usuario);

  }
    
}
