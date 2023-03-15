import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFuncionTramiteDto } from './dto/create-funcion-tramite.dto';
import { UpdateFuncionTramiteDto } from './dto/update-funcion-tramite.dto';
import { FuncionTramite } from './entities/funcion-tramite.entity';

@Injectable()
export class FuncionTramiteService {
  constructor(
    @InjectRepository(FuncionTramite)
    private readonly funcionTramiteRepository: Repository<FuncionTramite>
  ){}

  async create(data: CreateFuncionTramiteDto): Promise<FuncionTramite> {

    const nuevo = await this.funcionTramiteRepository.create(data);
    try {
      return await this.funcionTramiteRepository.save(nuevo);
    } catch (error) {
      if(error.code=='ER_DUP_ENTRY'){
        let existe = await this.funcionTramiteRepository.findOneBy({funcion_tramite: data.funcion_tramite});
        if(existe) throw new InternalServerErrorException ("La funcion-tramite  que intenta crear ya existe.");      
      } 

      throw new InternalServerErrorException('Error al crear la funcion-tramite: ',error.message);  
    }  
  }

  async findAll() {
    return await this.funcionTramiteRepository.findAndCount(
      {
          order:{
              funcion_tramite: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.funcionTramiteRepository.findOneBy({id_funcion_tramite: id});
    if (!respuesta) throw new NotFoundException("El registro solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateFuncionTramiteDto) {

    try{
      const respuesta = await this.funcionTramiteRepository.update(id, data);
      if((await respuesta).affected == 0){
        await this.findOne(id);
        throw new InternalServerErrorException("No se modificó el registro.");
      } 
      return respuesta;
    }
    catch(error){
      if(error.code=='ER_DUP_ENTRY'){
        throw new InternalServerErrorException('La funcion-tramite ingresada ya existe.');
      }      
      throw new InternalServerErrorException('Error al modificar la funcion-tramite: ',error.message);
    }    
  }

  async remove(id: number) {
    const respuesta = await this.funcionTramiteRepository.findOneBy({id_funcion_tramite: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de funcion-tramite que intenta eliminar");
    return await this.funcionTramiteRepository.remove(respuesta);
  }
}
