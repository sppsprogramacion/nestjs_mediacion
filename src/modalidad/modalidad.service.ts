import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModalidadDto } from './dto/create-modalidad.dto';
import { UpdateModalidadDto } from './dto/update-modalidad.dto';
import { Modalidad } from './entities/modalidad.entity';

@Injectable()
export class ModalidadService {
  constructor(
    @InjectRepository(Modalidad)
    private readonly modalidadRepository: Repository<Modalidad>
  ){}

  async create(data: CreateModalidadDto): Promise<Modalidad> {

    const nuevo = await this.modalidadRepository.create(data);
    try{
      
      return await this.modalidadRepository.save(nuevo);
    }catch (error) {
      if(error.code == "ER_DUP_ENTRY"){
        let existe = await this.modalidadRepository.findOneBy({modalidad: data.modalidad});
        if(existe) throw new InternalServerErrorException ("La modalidad que intenta crear ya existe.");        
      }

      throw new InternalServerErrorException ("Error al crear la modalidad: ", error.message);
    }
  }

  async findAll() {
    return await this.modalidadRepository.findAndCount(
      {
          order:{
              modalidad: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.modalidadRepository.findOneBy({id_modalidad: id});
    if (!respuesta) throw new NotFoundException("No se encontró el registro de modalidad solicitado.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateModalidadDto) {

    try{
      const respuesta = await this.modalidadRepository.update(id, data);
      if((await respuesta).affected == 0){
        await this.findOne(id);
        throw new InternalServerErrorException("No se modificó el registro.");
      } 
      return respuesta;
    }
    catch(error){
      if(error.code=='ER_DUP_ENTRY'){
        throw new InternalServerErrorException('La modalidad ingresada ya existe.');
      }      
      throw new InternalServerErrorException('Error al modificar la modalidad: ',error.message);
    }    
  }

  async remove(id: number) {
    const respuesta = await this.modalidadRepository.findOneBy({id_modalidad: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de modalidad que intenta eliminar");
    return await this.modalidadRepository.remove(respuesta);
  }
}
