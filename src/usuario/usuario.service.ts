import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>
  ){}
  async create(data: CreateUsuarioDto): Promise<Usuario> {
    const existe = await this.usuariosRepository.findOneBy({dni: data.dni});
    if(existe) throw new BadRequestException ("El dni del usuario que intenta crear ya existe.");
    const nuevo = await this.usuariosRepository.create(data);
    try {
      return await this.usuariosRepository.save(nuevo);
    } catch (error) {
      if(error.code=='ER_DUP_ENTRY'){
        const existe = await this.usuariosRepository.findOneBy({email: data.email});
        if(existe) throw new BadRequestException ("El email que se intentó crear ya existe. Intente guardar nuevamente");
      }      
      throw new NotFoundException('Error al crear el nuevo usuario: ',error.message);  
    }       
  }

  async findAll() {
    return await this.usuariosRepository.findAndCount(
      {
          order:{
              apellido: "ASC"
          }
      }
    );
  }

  //BUSCAR USUARIOS ACTIVOS O INACTIVOS
  async findUsuarios(activox: boolean) {
    const usuarios = await this.usuariosRepository.findAndCount(
      {        
        where: {
          activo: activox,          
        },
        order:{
          apellido: "ASC"
        }
      }
    );   
    return usuarios;
  }
  //FIN BUSCAR USUARIOS ACTIVOS O INACTIVOS ..........................................
  
  //BUSCAR USUARIOS ACTIVOS O INACTIVOS CON CENTROS DE MEDIACION
  async findUsuariosCentrosMediacion(activox: boolean) {
    const usuarios_centros = await this.usuariosRepository.findAndCount(
      {
        relations: ['centros_mediacion'], 
        where: {
          activo: activox,          
        },
        order: {
          apellido: "ASC"
        }
      }
    );   
    return usuarios_centros;
  }
  //FIN BUSCAR TRAMITES NUEVOS..........................................

  //BUSCAR  XDni
  async findXDni(dnix: number) {
    console.log("dni en servciio usuario", dnix);
    const respuesta = await this.usuariosRepository.findOneBy({dni: dnix});
    if (!respuesta) throw new NotFoundException("No se encontró el registro de usuario solicitado.");
    return respuesta;
  }
  //FIN BUSCAR  XDni..................................................................

  //BUSCAR  XID
  // async findOne(id: number) {

  //   const respuesta = await this.ciudadanoRepository.findOneBy({id_departamento: id});
  //   if (!respuesta) throw new NotFoundException("No se encontró el registro de departamento solicitado.");
  //   return respuesta;
  // }
  //FIN BUSCAR  XID..................................................................

  async update(dnix: number, data: UpdateUsuarioDto) {
    try{
      const respuesta = await this.usuariosRepository.update({dni: dnix}, data);
      if((respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de usuario.");
      return respuesta;
    }
    catch(error){
      throw new NotFoundException('Error al modificar el usuario: ',error.message);
    }
  }

  async remove(dnix: number) {
    const respuesta = await this.usuariosRepository.findOneBy({dni: dnix});
    if(!respuesta) throw new NotFoundException("No existe el registro de usuario que intenta eliminar");
    return await this.usuariosRepository.remove(respuesta);
  }

}
