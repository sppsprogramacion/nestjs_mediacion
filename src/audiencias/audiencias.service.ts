import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAudienciaDto } from './dto/create-audiencia.dto';
import { UpdateAudienciaDto } from './dto/update-audiencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Audiencia } from './entities/audiencia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AudienciasService {

  constructor(
    @InjectRepository(Audiencia)
    private readonly audienciaRepository: Repository<Audiencia>
  ){}

  async create(data: CreateAudienciaDto): Promise<Audiencia> {

    try {
      
      const nuevo = await this.audienciaRepository.create(data);
      return await this.audienciaRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);   
    }      
  }

  async findAll() {
    return await this.audienciaRepository.findAndCount(
      {
          order:{
              num_audiencia: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.audienciaRepository.findOneBy({id_audiencia: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateAudienciaDto) {

    try{
      const respuesta = await this.audienciaRepository.update(id, data);
      if((await respuesta).affected == 0){
        await this.findOne(id);
      } 
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }
  }

  async remove(id: number) {
    const respuesta = await this.audienciaRepository.findOneBy({id_audiencia: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de audiencia que intenta eliminar");
    return await this.audienciaRepository.remove(respuesta);
  }



  //MANEJO DE ERRORES
  private handleDBErrors(error: any): never {
    if(error.code === "ER_DUP_ENTRY"){
      throw new BadRequestException (error.sqlMessage);
    }
    
    if(error.status == 404) throw new NotFoundException(error.response);
  
    throw new InternalServerErrorException (error.message);
    }
    //FIN MANEJO DE ERRORES........................................

}
