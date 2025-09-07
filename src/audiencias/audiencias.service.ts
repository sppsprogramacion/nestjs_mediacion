import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAudienciaDto } from './dto/create-audiencia.dto';
import { UpdateAudienciaDto } from './dto/update-audiencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Audiencia } from './entities/audiencia.entity';
import { Between, Repository } from 'typeorm';
import { Tramite } from 'src/tramites/entities/tramite.entity';
import { UsuariosTramite } from 'src/usuarios-tramite/entities/usuarios-tramite.entity';
import { UpdateAudienciaResultadoDto } from './dto/update-audiencia-resultado.dto';

@Injectable()
export class AudienciasService {

  constructor(
    @InjectRepository(Audiencia)
    private readonly audienciaRepository: Repository<Audiencia>,
    @InjectRepository(Tramite)
    private readonly tramiteRepository: Repository<Tramite>,
    @InjectRepository(UsuariosTramite)
    private readonly usuarioTramiteRepository: Repository<UsuariosTramite>,

  ){}

  //CREAR NUEVA AUDIENCIA
  async create(data: CreateAudienciaDto): Promise<Audiencia> {
    let num_audiencia_nuevo:number = 0;
    let audiencia: Audiencia = new Audiencia;

    //controlar si se especifico la modalidad
    if(data.modalidad_id == 1){
      throw new BadRequestException ("Debe especificar la modalidad de la audiencia.")
    }

    //Control de existencia del tramite
    const tramiteExiste = await this.tramiteRepository.findOneBy({ numero_tramite: data.tramite_numero});
    if(!tramiteExiste) throw new BadRequestException ("El número de tramite para el que se desea crear la audiencia no existe.")
    //FIN Control de existencia del tramite

    //Control de la modalidad de las audiencias
    let audiencias_activas = await this.audienciaRepository.createQueryBuilder('audiencias')
      .where('audiencias.tramite_numero = :tramite_num', { tramite_num: data.tramite_numero })
      .andWhere('audiencias.esta_cerrada= :activa', {activa: false})
      .getMany();
    
    //controlar: para nueva audiencia modalidad conjunta (modalidad_id = 2) no deben haber ninguna audiencia abierta
    if(data.modalidad_id == 2 && audiencias_activas.length > 0){
      throw new ConflictException("No puede crear una nueva audiencia con modalidad conjunta cuando tiene una o mas audiencias abiertas.");
    }

    //controlar: para nueva audiencia modalidad separado (modalidad_id = 3) no deben haber ninguna audiencia abierta
    if(data.modalidad_id == 3 && audiencias_activas.length > 0){
      let cantSeparadas: number = 0;
      for(const audienciax of audiencias_activas){
        if(audienciax.modalidad_id == 3)
          cantSeparadas = cantSeparadas + 1;

      }

      if(cantSeparadas != audiencias_activas.length)
        throw new ConflictException("Solo se puede crear una nueva audiencia con modalidad separado cuando las audiencias que estan abiertas tambien tienen modalidad separado.");
    }
    //fin control de modalidad de la audiencia..........................

        
    //obtener cantidad de audiencias abiertas sin concluir en un horario
    const cant_audiencias_horario = await this.audienciaRepository.createQueryBuilder('audiencias')
      .select('count(audiencias.num_audiencia)','cantidad')
      .where('audiencias.usuario_id = :usuario_id', { usuario_id: data.usuario_id })
      .andWhere('audiencias.esta_cerrada= :activa', {activa: false})
      .andWhere('audiencias.fecha_inicio= :fecha', {fecha: data.fecha_inicio})
      .andWhere('audiencias.hora_inicio= :hora', {hora: data.hora_inicio})
      .getRawOne();
    
    if(cant_audiencias_horario.cantidad >0) throw new BadRequestException ("Ya tiene una audiencia programada para esta fecha y hora.")
    //FIN obtener cantidad de audiencias abiertas sin concluir en un horario


    //verificar si el usuario esta asigndo a este tramite
    const usuarioTramite = await this.usuarioTramiteRepository.findOne(
      {
        where: {
          tramite_numero: data.tramite_numero,
          usuario_id: data.usuario_id,
          activo: true
        }
      }
    )

    if (!usuarioTramite) throw new NotFoundException("El usuario no esta asignado a este tramite");


    //verificar si el usuario pertenece al centro de mediacion


    //obtener numero de audiencia maximo
    const num_audiencia_max = await this.audienciaRepository.createQueryBuilder('audiencias')
      .select('MAX(audiencias.num_audiencia)','num_max')
      .where('audiencias.tramite_numero = :tramite_num', { tramite_num: data.tramite_numero })
      .getRawOne();
    
    if(!num_audiencia_max) {
      num_audiencia_max.num_max = 0;
    }      
    num_audiencia_nuevo = num_audiencia_max.num_max + 1;
    //FIN obtener numero de audiencia maximo

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
  //FIN CREAR NUEVA AUDIENCIA..................................

  async findAll() {
    return await this.audienciaRepository.findAndCount(
      {
          order:{
              num_audiencia: "ASC"
          }
      }
    );
  }

  //BUSCAR X USUARIO
  async findByUsuario(id_usuario: number) {
    const audiencias = await this.audienciaRepository.findAndCount(
      {        
        //relations: ['asignaciones','convocados','vinculados'],
        where: {
          usuario_id: id_usuario,
          esta_cerrada: false
        },
        order:{
          fecha_inicio: "DESC",
        }
      }
    );   

    return audiencias;
  }
  //FIN BUSCAR  X USUARIO..........................................

  //BUSCAR X TRAMITE
  async findByTramite(id_tramite: number) {
    const audiencias = await this.audienciaRepository.findAndCount(
      {        
        //relations: ['asignaciones','convocados','vinculados'],
        where: {
          tramite_numero: id_tramite
        },
        order:{
          num_audiencia: "DESC",
        }
      }
    );   

    return audiencias;
  }
  //FIN BUSCAR  X TRAMITE..........................................

  //BUSCAR X Fecha Audiencia
  async findByFechaAudiencia(fecha_inix: Date, fecha_finx: Date) {
    const audiencias = await this.audienciaRepository.findAndCount(
      {        
        //relations: ['asignaciones','convocados','vinculados'],
        where: {
          fecha_inicio: Between(fecha_inix, fecha_finx)
        },
        order:{
          tramite_numero: "DESC",
        }
      }
    );   

    return audiencias;
  }
  //FIN BUSCAR  X Fecha Audiencia..........................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.audienciaRepository.findOneBy({id_audiencia: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  //RESULTADO AUDIENCIA
  async resultadoAudiencia(id: number, data: UpdateAudienciaResultadoDto) {
    
    data.esta_cerrada = true;
    
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

  //FIN RESULTADO AUDIENCIA.....................................................

  //CAMBIAR MEDIADOR AUDIENCIA
  async cambiarMediador(numero_tramitex: number, id_usuariox: number) {
    
    try{
      const respuesta = await this.audienciaRepository.createQueryBuilder('audiencias')
      .update('audiencias')
      .set({usuario_id: id_usuariox})
      .where('tramite_numero = :tramite_numero',{tramite_numero: numero_tramitex})
      .andWhere('esta_cerrada = :esta_cerrada', {esta_cerrada: false})
      .execute();
    }
    catch (error){
      this.handleDBErrors(error);
    }
    
    
  }

  //FIN CAMBIAR MEDIADOR AUDIENCIA.....................................................

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
