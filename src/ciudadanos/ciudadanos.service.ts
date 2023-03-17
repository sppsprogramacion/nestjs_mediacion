import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  //CREAR CIUDADANO
  async create(data: CreateCiudadanoDto): Promise<Ciudadano> {    
    
    const nuevo = await this.ciudadanoRepository.create(data);
    try {
      return await this.ciudadanoRepository.save(nuevo);
    } catch (error) {
      if(error.code=='ER_DUP_ENTRY'){
        let existe = await this.ciudadanoRepository.findOneBy({dni: data.dni});
        if(existe) throw new InternalServerErrorException ("El dni del ciudadano que intenta crear ya existe.");
      
        existe = null;
        existe = await this.ciudadanoRepository.findOneBy({email: data.email});
        if(existe) throw new InternalServerErrorException ("El email del ciudadano que se intentó crear ya existe.");
      } 

      throw new InternalServerErrorException('Error al crear el ciudadano: ',error.message);  
    }
  }
  //FIN CREAR CIUDADANO......................................................

  //BUSCAR TODOS LOS CIUDADANOS
  async findAll() {

    return await this.ciudadanoRepository.findAndCount(
      {
          order:{
              apellido: "ASC"
          }
      }
    );
  }
  //FIN BUSCAR TODOS LOS CIUDADANOS....................................

  //BUSCAR  XDni
  async findXDni(dnix: number) {

    const respuesta = await this.ciudadanoRepository.findOneBy({dni: dnix});
    if (!respuesta) throw new NotFoundException("El registro solicitado no existe.");
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

  //MODIFICAR CIUDADANO
  async update(dnix: number, data: UpdateCiudadanoDto) {

    try{
      const respuesta = await this.ciudadanoRepository.update({dni: dnix}, data);
      if(( await respuesta).affected == 0){
        await this.findXDni(dnix);
        throw new InternalServerErrorException("No se modificó el registro.");
      } 
      return respuesta;
    }
    catch(error){
      if(error.code=='ER_DUP_ENTRY'){
        let existe = await this.ciudadanoRepository.findOneBy({dni: data.dni});
        if(existe) throw new InternalServerErrorException ("El dni del ciudadano ya existe.");
      
        existe = null;
        existe = await this.ciudadanoRepository.findOneBy({email: data.email});
        if(existe) throw new InternalServerErrorException ("El email del ciudadano ya existe.");
      } 
      throw new InternalServerErrorException('Error al modificar el ciudadano: ',error.message);
    }
  }
  //FIN MODIFICAR CIUDADANO.......................................

  //ELIMINAR CIUDADANO
  async remove(dnix: number) {
    
    const respuesta = await this.ciudadanoRepository.findOneBy({dni: dnix});
    if(!respuesta) throw new NotFoundException("No existe el registro de ciudadano que intenta eliminar");
    return await this.ciudadanoRepository.remove(respuesta);
  }
  //FIN ELIMINAR CIUDADANO..........................................
}
