import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { LoginCiudadanoDto } from './dto/login-ciudadano.dto';
import { Ciudadano } from 'src/ciudadanos/entities/ciudadano.entity';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UsuarioGeneral } from './interfaces/usuario-general.interface';


@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(Ciudadano)
    private readonly ciudadanoRepository: Repository<Ciudadano>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    private readonly jwtService: JwtService,
    
  ){}

  //LOGIN CIUDADANO
  async loginCiudadano(loginCiudadanoDto: LoginCiudadanoDto){
    const { dni, clave } = loginCiudadanoDto;   
    const ciudadano = await this.ciudadanoRepository.createQueryBuilder('ciudadano')
    .where('ciudadano.dni = :dni', { dni: dni })
    .select(['ciudadano', 'ciudadano.clave'])
    .getOne();
    
    if(!ciudadano)
      throw new UnauthorizedException ("Los datos de login no son válidos");

    if( !bcrypt.compareSync(clave, ciudadano.clave) )
      throw new UnauthorizedException ("Los datos de login no son válidos");

    const ciudadano2 = await this.ciudadanoRepository.findOneBy({dni: dni});

    //return ciudadano;
    return {
      ...ciudadano2,
      token: this.getJwtToken( {id_usuario: ciudadano2.id_ciudadano, tipo: "ciudadano"} )
    }
    //TODO: RETORNAR jWT
  }
  //FIN LOGIN CIUDADANO............................................................

  //LOGIN USUARIO
  async loginUsuario(loginUsuarioDto: LoginUsuarioDto){
    const { dni, clave } = loginUsuarioDto;    
    const usuario = await this.usuarioRepository.createQueryBuilder('usuario')
    .where('usuario.dni = :dni', { dni: dni })
    .select(['usuario.dni', 'usuario.clave'])
    .getOne();

    if(!usuario)
      throw new UnauthorizedException ("Los datos de login no son válidos");

    if( !bcrypt.compareSync(clave, usuario.clave) )
      throw new UnauthorizedException ("Los datos de login no son válidos");

    const usuario2 = await this.usuarioRepository.findOneBy({dni: dni});
    
    return {
      ...usuario2,
      //token: this.getJwtToken( {dni: usuario2.dni})
      token: this.getJwtToken( {id_usuario: usuario2.id_usuario, tipo: "usuario"} )
    };
    
    //habilitar si no funciona
    //return await this.usuarioRepository.findOneBy({dni: dni})
    //TODO: RETORNAR jWT
  }
  //FIN LOGIN USUARIO.................................................................

  //CONTROLAR TOKEN ciudadano
  async checkAuthStatusCiudadano(ciudadanox:UsuarioGeneral){
    
    const {id_usuario, ...ciudadanoSinId} = ciudadanox;
    const ciudadanoModificado = {...ciudadanoSinId, id_ciudadano: id_usuario};
    
    return {
      ...ciudadanoModificado,
      token: this.getJwtToken( {id_usuario: ciudadanox.id_usuario, tipo: "ciudadano"} )
    };
  }
  //FIN CONTROLAR TOKEN ciudadano..................

  //CONTROLAR TOKEN usuario
  async checkAuthStatusUsuario(id_usuariox:number){
    const usuario2 = await this.usuarioRepository.findOneBy({id_usuario: id_usuariox});
  
    return {
      ...usuario2,
      //token: this.getJwtToken( {dni: usuario2.dni})
      token: this.getJwtToken( {id_usuario: usuario2.id_usuario, tipo: "usuario"} )
    };
  }
  //FIN CONTROLAR TOKEN USUARIO...............................

  //RETORNAR TOKEN
  private getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);

    return token;
  }
  //FIN RETORNAR TOKEN..................................................

}
