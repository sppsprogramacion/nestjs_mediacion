import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAudienciaDto } from './dto/create-audiencia.dto';
import { UpdateAudienciaDto } from './dto/update-audiencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Audiencia } from './entities/audiencia.entity';
import { Repository } from 'typeorm';
import { Tramite } from 'src/tramites/entities/tramite.entity';

@Injectable()
export class AudienciasService {

  constructor(
    @InjectRepository(Audiencia)
    private readonly audienciaRepository: Repository<Audiencia>,
    @InjectRepository(Tramite)
    private readonly tramiteRepository: Repository<Tramite>,

  ){}

  //CREAR NUEVA AUDIENCIA
  async create(data: CreateAudienciaDto): Promise<Audiencia> {
    let num_audiencia_nuevo:number = 0;
    let audiencia: Audiencia = new Audiencia;
    //Control de existencia del tramite
    const tramiteExiste = await this.tramiteRepository.findOneBy({ numero_tramite: data.tramite_numero});
    if(!tramiteExiste) throw new BadRequestException ("El número de tramite para el que se desea crear la audiencia no existe.")
    //FIN Control de existencia del tramite
  
    //obtener numero de audiencia maximo
    const num_audiencia_max = await this.audienciaRepository.createQueryBuilder('audiencias')
      .select('MAX(audiencias.num_audiencia)','num_max')
      .where('audiencias.tramite_numero = :tramite_num', { tramite_num: data.tramite_numero })
      .getRawOne();
    
    if(!num_audiencia_max) {
      num_audiencia_max.num_max = 0;
    }      
    num_audiencia_nuevo = num_audiencia_max.num_max + 1;

    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];    
    data.fecha_creacion = fecha_actual;  

    data.num_audiencia = num_audiencia_nuevo;
    audiencia.num_audiencia = num_audiencia_nuevo;
    try {
      
      const nuevo = await this.audienciaRepository.create(data);
      return await this.audienciaRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);   
    }      
  }
  //FIN CREAR NUEVA AUDIENCIA

  async findAll() {
    return await this.audienciaRepository.findAndCount(
      {
          order:{
              num_audiencia: "ASC"
          }
      }
    );
  }

  //BUSCAR TRAMITES X CIUDADANO X ESTADO --- 1 NUEVO - 2 CON MEDIADOR - 3 FINALIZADO 
  async findXUsuario(id_usuario: number) {
    const tramites = await this.audienciaRepository.findAndCount(
      {        
        //relations: ['asignaciones','convocados','vinculados'],
        where: {
          usuario_id: id_usuario
        },
        order:{
          fecha_inicio: "DESC",
        }
      }
    );   

    return tramites;
  }
  //FIN BUSCAR TRAMITES NUEVOS..........................................

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
