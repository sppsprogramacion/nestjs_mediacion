import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateObjetoDto } from './dto/create-objeto.dto';
import { UpdateObjetoDto } from './dto/update-objeto.dto';
import { Objeto } from './entities/objeto.entity';

@Injectable()
export class ObjetosService {
  constructor(
    @InjectRepository(Objeto)
    private readonly objetoRepository: Repository<Objeto>
  ){}

  async create(data: CreateObjetoDto): Promise<Objeto> {

    const nuevo = await this.objetoRepository.create(data);
    try {

      return await this.objetoRepository.save(nuevo);
    }catch (error) {
      if(error.code == 'ER_DUP_ENTRY'){
        let existe = await this.objetoRepository.findOneBy({objeto: data.objeto});
        if(existe) throw new InternalServerErrorException ("El objeto que intenta crear ya existe.");      
      } 

      throw new InternalServerErrorException('Error al crear el objeto: ',error.message);  
    }      
  }

  async findAll() {
    return await this.objetoRepository.findAndCount(
      {
          order:{
              objeto: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.objetoRepository.findOneBy({id_objeto: id});
    if (!respuesta) throw new NotFoundException("El registro solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateObjetoDto) {

    try{
      const respuesta = await this.objetoRepository.update(id, data);
      if((await respuesta).affected == 0){
        await this.findOne(id);
        throw new InternalServerErrorException("No se modificó el registro.");
      } 
      return respuesta;
    }
    catch(error){
      if(error.code=='ER_DUP_ENTRY'){
        throw new InternalServerErrorException('El objeto ingresada ya existe.');
      }      
      throw new InternalServerErrorException('Error al modificar el objeto: ',error.message);
    } 
  }

  async remove(id: number) {
    const respuesta = await this.objetoRepository.findOneBy({id_objeto: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de objeto que intenta eliminar");
    return await this.objetoRepository.remove(respuesta);
  }
}
