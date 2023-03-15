import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstadoTramiteDto } from './dto/create-estado-tramite.dto';
import { UpdateEstadoTramiteDto } from './dto/update-estado-tramite.dto';
import { EstadoTramite } from './entities/estados-tramite.entity';

@Injectable()
export class EstadosTramiteService {
  constructor(
    @InjectRepository(EstadoTramite)
    private readonly estadoTramiteRepository: Repository<EstadoTramite>
  ){}

  async create(data: CreateEstadoTramiteDto): Promise<EstadoTramite> {

    const nuevo = await this.estadoTramiteRepository.create(data);
    try {
      return await this.estadoTramiteRepository.save(nuevo);
    } catch (error) {
      if(error.code=='ER_DUP_ENTRY'){
        let existe = await this.estadoTramiteRepository.findOneBy({estado_tramite: data.estado_tramite});
        if(existe) throw new InternalServerErrorException ("El estado-tramite que intenta crear ya existe.");      
      } 

      throw new InternalServerErrorException('Error al crear el estado-tramite: ',error.message);  
    }
    
  }

  async findAll() {
    return await this.estadoTramiteRepository.findAndCount(
      {
          order:{
              estado_tramite: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.estadoTramiteRepository.findOneBy({id_estado_tramite: id});
    if (!respuesta) throw new NotFoundException("El registro solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateEstadoTramiteDto) {

    try{
      const respuesta = await this.estadoTramiteRepository.update(id, data);
      if((await respuesta).affected == 0){
        await this.findOne(id);
        throw new InternalServerErrorException("No se modificó el registro.");
      } 
      return respuesta;
    }
    catch(error){
      if(error.code=='ER_DUP_ENTRY'){
        throw new InternalServerErrorException('El estado-tramite ingresado ya existe.');
      }      
      throw new InternalServerErrorException('Error al modificar el estado-tramite: ',error.message);
    }    
  }

  async remove(id: number) {
    const respuesta = await this.estadoTramiteRepository.findOneBy({id_estado_tramite: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de estado de tramite que intenta eliminar");
    return await this.estadoTramiteRepository.remove(respuesta);
  }
}
