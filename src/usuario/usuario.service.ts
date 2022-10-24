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
    private readonly usuiariosRepository: Repository<Usuario>
  ){}
  async create(data: CreateUsuarioDto): Promise<Usuario> {
    const existe = await this.usuiariosRepository.findOneBy({dni: data.dni});
    if(existe) throw new BadRequestException ("El dni del usuario que intenta crear ya existe.");
    const nuevo = await this.usuiariosRepository.create(data);
    try {
      return await this.usuiariosRepository.save(nuevo);
    } catch (error) {
      if(error.code=='ER_DUP_ENTRY'){
        const existe = await this.usuiariosRepository.findOneBy({email: data.email});
        if(existe) throw new BadRequestException ("El email que se intentó crear ya existe. Intente guardar nuevamente");
      }      
      throw new NotFoundException('Error al crear el nuevo usuario: ',error.message);  
    }       
  }

  async findAll() {
    return await this.usuiariosRepository.findAndCount(
      {
          order:{
              apellido: "ASC"
          }
      }
    );
  }

  //BUSCAR  XDni
  async findXDni(dnix: number) {
    console.log("dni en servciio usuario", dnix);
    const respuesta = await this.usuiariosRepository.findOneBy({dni: dnix});
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
      const respuesta = await this.usuiariosRepository.update({dni: dnix}, data);
      if((respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de usuario.");
      return respuesta;
    }
    catch(error){
      throw new NotFoundException('Error al modificar el usuario: ',error.message);
    }
  }

  async remove(dnix: number) {
    const respuesta = await this.usuiariosRepository.findOneBy({dni: dnix});
    if(!respuesta) throw new NotFoundException("No existe el registro de usuario que intenta eliminar");
    return await this.usuiariosRepository.remove(respuesta);
  }

}
