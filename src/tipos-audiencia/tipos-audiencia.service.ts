import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoAudienciaDto } from './dto/create-tipo-audiencia.dto';
import { UpdateTipoAudienciaDto } from './dto/update-tipo-audiencia.dto';
import { TipoAudiencia } from './entities/tipos-audiencia.entity';

@Injectable()
export class TiposAudienciaService {
  constructor(
    @InjectRepository(TipoAudiencia)
    private readonly tipoAudienciaRepository: Repository<TipoAudiencia>
  ){}

  async create(data: CreateTipoAudienciaDto): Promise<TipoAudiencia> {

    const nuevo = await this.tipoAudienciaRepository.create(data);
    try {

      return await this.tipoAudienciaRepository.save(nuevo);
    }catch (error) {
      if(error.code == 'ER_DUP_ENTRY'){
        let existe = await this.tipoAudienciaRepository.findOneBy({tipo_audiencia: data.tipo_audiencia});
        if(existe) throw new InternalServerErrorException ("El tipo-audiencia que intenta crear ya existe.");      
      } 

      throw new InternalServerErrorException('Error al crear el tipo-audiencia: ',error.message);  
    }      
  }

  async findAll() {
    return await this.tipoAudienciaRepository.findAndCount(
      {
          order:{
              tipo_audiencia: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.tipoAudienciaRepository.findOneBy({id_tipo_audiencia: id});
    if (!respuesta) throw new NotFoundException("No se encontró el registro de tipo-audiencia solicitado.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateTipoAudienciaDto) {

    try{
      const respuesta = await this.tipoAudienciaRepository.update(id, data);
      if((await respuesta).affected == 0){
        await this.findOne(id);
        throw new InternalServerErrorException("No se modificó el registro.");
      } 
      return respuesta;
    }
    catch(error){
      if(error.code=='ER_DUP_ENTRY'){
        throw new InternalServerErrorException('El tipo-audiencia  ingresada ya existe.');
      }      
      throw new InternalServerErrorException('Error al modificar el tipo-audiencia : ',error.message);
    }
  }

  async remove(id: number) {
    const respuesta = await this.tipoAudienciaRepository.findOneBy({id_tipo_audiencia: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de tipo-audiencia que intenta eliminar");
    return await this.tipoAudienciaRepository.remove(respuesta);
  }
}
