import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSexoDto } from './dto/create-sexo.dto';
import { UpdateSexoDto } from './dto/update-sexo.dto';
import { Repository } from 'typeorm';
import { Sexo } from './entities/sexo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SexoService {
  constructor(
    @InjectRepository(Sexo)
    private readonly sexoRepository: Repository<Sexo>
  ){}

  async create(data: CreateSexoDto): Promise<Sexo> {

    const nuevo = await this.sexoRepository.create(data);
    try {

      return await this.sexoRepository.save(nuevo);
    }catch (error) {
      if(error.code == 'ER_DUP_ENTRY'){
        let existe = await this.sexoRepository.findOneBy({sexo: data.sexo});
        if(existe) throw new InternalServerErrorException ("El sexo que intenta crear ya existe.");      
      } 

      throw new InternalServerErrorException('Error al crear el sexo: ',error.message);  
    }     
  }

  async findAll() {
    return await this.sexoRepository.findAndCount(
      {
          order:{
              sexo: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.sexoRepository.findOneBy({id_sexo: id});
    if (!respuesta) throw new NotFoundException("El registro solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateSexoDto) {

    try{
      const respuesta = await this.sexoRepository.update(id, data);
      if((await respuesta).affected == 0){
        await this.findOne(id);
        throw new InternalServerErrorException("No se modificó el registro.");
      } 
      return respuesta;
    }
    catch(error){
      if(error.code=='ER_DUP_ENTRY'){
        throw new InternalServerErrorException('El sexo ingresada ya existe.');
      }      
      throw new InternalServerErrorException('Error al modificar el sexo: ',error.message);
    }   
  }

  async remove(id: number) {
    const respuesta = await this.sexoRepository.findOneBy({id_sexo: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de sexo que intenta eliminar");
    return await this.sexoRepository.remove(respuesta);
  }
}
