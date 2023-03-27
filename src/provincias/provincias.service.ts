import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';
import { Repository } from 'typeorm';
import { Provincia } from './entities/provincia.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProvinciasService {
  constructor(
    @InjectRepository(Provincia)
    private readonly provinciasRepository: Repository<Provincia>
  ){}

  async create(data: CreateProvinciaDto): Promise<Provincia> {

    const nuevo = await this.provinciasRepository.create(data);
    try {

      return await this.provinciasRepository.save(nuevo);
    }catch (error) {
      if(error.code == 'ER_DUP_ENTRY'){
        let existe = await this.provinciasRepository.findOneBy({provincia: data.provincia});
        if(existe) throw new InternalServerErrorException ("La provincia que intenta crear ya existe.");      
      } 

      throw new InternalServerErrorException('Error al crear la provinvia: ',error.message);  
    }
  }

  async findAll() {
    return await this.provinciasRepository.findAndCount(
      {
          order:{
              provincia: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.provinciasRepository.findOneBy({id_provincia: id});
    if (!respuesta) throw new NotFoundException("No se encontró el registro de provincia solicitado.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateProvinciaDto) {

    try{
      const respuesta = await this.provinciasRepository.update(id, data);
      if((await respuesta).affected == 0){
        await this.findOne(id);
        throw new InternalServerErrorException("No se modificó el registro.");
      } 
      return respuesta;
    }
    catch(error){
      if(error.code=='ER_DUP_ENTRY'){
        throw new InternalServerErrorException('La provincia ingresada ya existe.');
      }      
      throw new InternalServerErrorException('Error al modificar la provinvia: ',error.message);
    }    
  }

  async remove(id: number) {
    const respuesta = await this.provinciasRepository.findOneBy({id_provincia: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de provincia que intenta eliminar");
    return await this.provinciasRepository.remove(respuesta);
  }
}
