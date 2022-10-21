import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTramiteDto } from './dto/create-tramite.dto';
import { UpdateTramiteDto } from './dto/update-tramite.dto';
import { Tramite } from './entities/tramite.entity';

@Injectable()
export class TramitesService {

  constructor(
    @InjectRepository(Tramite)
    private readonly tramiteRepository: Repository<Tramite>
  ){}

  async create(data: CreateTramiteDto): Promise<Tramite> {
    
    // const existe = await this.tramiteRepository.findOneBy({dni: data.dni});
    // if(existe) throw new BadRequestException ("El tramite que intenta crear ya existe.");
    const nuevo = await this.tramiteRepository.create(data);
    try {
      return await this.tramiteRepository.save(nuevo);
    } catch (error) {
          
      throw new NotFoundException(error.message);  
    }       
  }

  async findAll() {
    return await this.tramiteRepository.findAndCount(
      {
          order:{
              id_tramite: "ASC"
          }
      }
    );
  }

  //BUSCAR  XDni
  // async findXDni(dnix: number) {

  //   const respuesta = await this.tramiteRepository.findOneBy({dni: dnix});
  //   if (!respuesta) throw new NotFoundException("No se encontró el registro de ciudadano solicitado.");
  //   return respuesta;
  // }
  //FIN BUSCAR  XDni..................................................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.tramiteRepository.findOneBy({id_tramite: id});
    if (!respuesta) throw new NotFoundException("No se encontró el registro de tramite solicitado.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateTramiteDto) {
    try{
      const respuesta = await this.tramiteRepository.update({id_tramite: id}, data);
      if((respuesta).affected == 0) throw new NotFoundException("No se modificó el tramite.");
      return respuesta;
    }
    catch(error){
      throw new NotFoundException('Error al modificar el tramite: ',error.message);
    }
  }

  async remove(id: number) {
    const respuesta = await this.tramiteRepository.findOneBy({id_tramite: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de tramite que intenta eliminar");
    return await this.tramiteRepository.remove(respuesta);
  }
}
