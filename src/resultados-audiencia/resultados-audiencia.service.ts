import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateResultadoAudienciaDto } from './dto/create-resultado-audiencia.dto';
import { UpdateResultadoAudienciaDto } from './dto/update-resultado-audiencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultadoAudiencia } from './entities/resultados-audiencia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResultadosAudienciaService {
  
  constructor(
    @InjectRepository(ResultadoAudiencia)
    private readonly resultadoAudienciaRepository: Repository<ResultadoAudiencia>
  ){}

  async create(data: CreateResultadoAudienciaDto): Promise<ResultadoAudiencia> {

    try {
      
      const nuevo = await this.resultadoAudienciaRepository.create(data);
      return await this.resultadoAudienciaRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);   
    }
  }

  async findAll() {
    return await this.resultadoAudienciaRepository.findAndCount(
      {
          order:{
              resultado_audiencia: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.resultadoAudienciaRepository.findOneBy({id_resultado_audiencia: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateResultadoAudienciaDto) {

    try{
      const respuesta = await this.resultadoAudienciaRepository.update(id, data);
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
    const respuesta = await this.resultadoAudienciaRepository.findOneBy({id_resultado_audiencia: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de resultado audiencia que intenta eliminar");
    return await this.resultadoAudienciaRepository.remove(respuesta);
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
