import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from '@nestjs/typeorm';

import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Repository } from 'typeorm';
import { Ciudadano } from "src/ciudadanos/entities/ciudadano.entity";
import { UsuarioGeneral } from "../interfaces/usuario-general.interface";

@Injectable() //se lo decora con injectable porque es un provider (servicio)
export class JwtStrategy extends PassportStrategy( Strategy) {

    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,

        @InjectRepository(Ciudadano)
        private readonly ciudadanoRepository: Repository<Ciudadano>,

        configService: ConfigService
    ){

        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }
    

    async validate(payload: JwtPayload):Promise<UsuarioGeneral> {
        
        let usuarioGeneral: UsuarioGeneral;

        const { id_usuario, tipo } = payload;
        
        if (tipo == "usuario"){
            const usuario = await this.usuarioRepository.findOneBy ({id_usuario});

            if (!usuario) 
                throw new UnauthorizedException('Token no es valido.')
    
            if (!usuario.activo)
                throw new UnauthorizedException('El usuario esta inactivo')
            
            usuarioGeneral = usuario;
            console.log("usuario", usuarioGeneral);
            
            return usuarioGeneral;
        }

        if (tipo == "ciudadano"){
            const ciudadano = await this.ciudadanoRepository.findOneBy ({id_ciudadano: id_usuario});

            if (!ciudadano) 
                throw new UnauthorizedException('Token no es valido.')
    
            // if (!usuario.activo)
            //     throw new UnauthorizedException('El usuario esta inactivo')
            
            const {id_ciudadano, ...ciudadanoSinId} = ciudadano;
            const ciudadanoNuevo = {...ciudadanoSinId, id_usuario: id_ciudadano, activo: true};
            usuarioGeneral = ciudadanoNuevo;

            console.log("ciudadano", usuarioGeneral);

            return usuarioGeneral;
        }
        

    }
}