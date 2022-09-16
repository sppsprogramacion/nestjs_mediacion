import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCiudadanoDto } from './dto/create-ciudadano.dto';
import { UpdateCiudadanoDto } from './dto/update-ciudadano.dto';
import { Ciudadano } from './entities/ciudadano.entity';

@Injectable()
export class CiudadanosService {
  constructor(
    @InjectRepository(Ciudadano)
    private readonly ciudadanoRepository: Repository<Ciudadano>
  ){}

  async create(data: CreateCiudadanoDto): Promise<Ciudadano> {
    const existe = await this.ciudadanoRepository.findOneBy({dni: data.dni});
    if(existe) throw new BadRequestException ("El dni del ciudadano que intenta crear ya existe.");
    const nuevo = await this.ciudadanoRepository.create(data);
    return await this.ciudadanoRepository.save(nuevo);
  }

  async findAll() {
    return await this.ciudadanoRepository.findAndCount(
      {
          order:{
              apellido: "ASC"
          }
      }
    );
  }

  //BUSCAR  XDni
  async findXDni(dnix: number) {

    const respuesta = await this.ciudadanoRepository.findOneBy({dni: dnix});
    if (!respuesta) throw new NotFoundException("No se encontró el registro de ciudadano solicitado.");
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

  async update(dnix: number, data: UpdateCiudadanoDto) {
    try{
      const respuesta = await this.ciudadanoRepository.update({dni: dnix}, data);
      if((respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de ciudadano.");
      return respuesta;
    }
    catch(error){
      throw new NotFoundException('Error al modificar el ciudadano: ',error.message);
    }
  }

  async remove(dnix: number) {
    const respuesta = await this.ciudadanoRepository.findOneBy({dni: dnix});
    if(!respuesta) throw new NotFoundException("No existe el registro de ciudadano que intenta eliminar");
    return await this.ciudadanoRepository.remove(respuesta);
  }
}
