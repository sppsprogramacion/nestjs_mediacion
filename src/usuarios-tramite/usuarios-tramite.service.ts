import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuariosTramiteDto } from './dto/create-usuarios-tramite.dto';
import { UpdateUsuariosTramiteDto } from './dto/update-usuarios-tramite.dto';
import { Usuario } from '../usuario/entities/usuario.entity';
import { UsuariosTramite } from './entities/usuarios-tramite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosTramiteService {
  constructor(
    @InjectRepository(UsuariosTramite)
    private readonly usuariosTramiteRepository: Repository<UsuariosTramite>
  ){}

  async create(data: CreateUsuariosTramiteDto): Promise<UsuariosTramite> {
    // const existe = await this.usuariosCentroRepository.findOne(
    //   {
    //     where:{
    //       usuario_dni: data.usuario_dni,
    //       centro_mediacion_id: data.centro_mediacion_id,
    //       activo: true
    //     }
    //   }
    // );
    // if(existe) throw new BadRequestException ("La asignación de usuario a un centro de mediación que intenta crear ya existe.");
    const nuevo = await this.usuariosTramiteRepository.create(data);
    try {
      return await this.usuariosTramiteRepository.save(nuevo);
    } catch (error) {
          
      throw new NotFoundException('Error al asignar el usuario a un trmite: ',error.message);  
    }       
  }

  

  //BUSCAR  XID
  async findTramitesXUsuario(id_usuario: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    const respuesta = await this.usuariosTramiteRepository.findAndCount(
      {
        //relations: ['usuario','centro_mediacion'],
        where: {
          usuario_id: id_usuario,
          activo: true
        }      
          
      }
    );
    
    if (!respuesta) throw new NotFoundException("No se encontró el tramites para este usuario.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  //BUSCAR  TRAMITES ASIGNADOS ACTIVOS
  async findTramitesActivos() {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    const respuesta = await this.usuariosTramiteRepository.findAndCount(
      {
        //relations: ['usuario','centro_mediacion'],
        where: {
          activo: true,
        }      
          
      }
    );
    if (!respuesta) throw new NotFoundException("No se encontró el tramites para este usuario.");
    return respuesta;
  }
  //FIN BUSCAR  TRAMITES ASIGNADOS ACTIVOS..................................................................

  async findAll() {
    return await this.usuariosTramiteRepository.findAndCount(
      {
        //relations: ['usuario','centro_mediacion'],
        where:{
          activo: true
        },
        order:{
            id_usuario_tramite: "ASC"
        }
      }
    );
  }

  
  //BUSCAR  XID
  async findOne(id: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    const respuesta = await this.usuariosTramiteRepository.findOne(
      {
        //relations: ['usuario','centro_mediacion'],
        where: {
          id_usuario_tramite: id,
        }      
          
      }
    );
    if (!respuesta) throw new NotFoundException("No se encontró el registro de usuario-tramite.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateUsuariosTramiteDto) {
    try{
      const respuesta = await this.usuariosTramiteRepository.update({id_usuario_tramite: id}, data);
      if((respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de usuario-tramite.");
      return respuesta;
    }
    catch(error){
      throw new NotFoundException('Error al modificar el usuario-tramite: ',error.message);
    }
  }

  async remove(id: number) {
    const respuesta = await this.usuariosTramiteRepository.findOneBy({id_usuario_tramite: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de usuario-tramite que intenta eliminar");
    return await this.usuariosTramiteRepository.remove(respuesta);
  }
}
