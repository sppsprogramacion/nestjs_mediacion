import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudadano } from 'src/ciudadanos/entities/ciudadano.entity';
import databaseConfig from 'src/config/database.config';
import { Repository } from 'typeorm';
import { CreateTramiteDto } from './dto/create-tramite.dto';
import { UpdateTramiteDto } from './dto/update-tramite.dto';
import { Tramite } from './entities/tramite.entity';
import { UsuarioCentro } from '../usuarios-centros/entities/usuario-centro.entity';
import { UsuariosCentrosService } from '../usuarios-centros/usuarios-centros.service';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { UpdateTramiteFinalizacionDto } from './dto/update-tramite-finalizacion.dto';
import { Audiencia } from 'src/audiencias/entities/audiencia.entity';
import { UpdateTramiteExpedienteDto } from './dto/update-tramite-expediente-numero.dto';

@Injectable()
export class TramitesService {

  constructor(
    @InjectRepository(Tramite)
    private readonly tramiteRepository: Repository<Tramite>,
    @InjectRepository(Ciudadano)
    private readonly ciudadanoRepository: Repository<Ciudadano>,
    @InjectRepository(Audiencia)
    private readonly audienciaRepository: Repository<Audiencia>,

    private readonly usuarioCentroService: UsuariosCentrosService,
    private readonly usuarioService: UsuarioService

  ){}

  //NUEVO TRAMITE
  async create(data: CreateTramiteDto): Promise<Tramite> {
    let num_tramite_nuevo:number = 0;
    
    //obtener año actual   
    let anio:number= new Date().getFullYear(); 

    //Control de existencia del ciudadano
    const ciudadano_existe = await this.ciudadanoRepository.findOneBy({ id_ciudadano: data.ciudadano_id});
    if(!ciudadano_existe) throw new BadRequestException ("El ciudadano que intenta crear el tramite no existe.")
    //FIN Control de existencia del ciudadano

    //obtener numero de tramite maximo
    const num_tramite_max = await this.tramiteRepository.createQueryBuilder('tramites')
      .select('MAX(tramites.numero_tramite)','num_max')
      .getRawOne();
    
    if(!num_tramite_max) {
      num_tramite_max.num_max = 0;
    }      
    num_tramite_nuevo = num_tramite_max.num_max + 1;

    //cargar datos por defecto
    data.numero_tramite = num_tramite_nuevo;
    
    //guardar tramite
    const nuevo = await this.tramiteRepository.create(data);
    try {
      return await this.tramiteRepository.save(nuevo);
    } catch (error) {
      if(error.code=='ER_DUP_ENTRY'){
        const existe = await this.tramiteRepository.findOneBy({numero_tramite: data.numero_tramite});
        if(existe) throw new BadRequestException ("Error al generar el número de tramite. Intente guardar nuevamente");
      }      
      
      this.handleDBErrors(error); 
    }    
  }
  //FIN NUEVO TRAMITE..................................................................

  //TODOS LOS TRAMITES
  async findAll() {
    return await this.tramiteRepository.findAndCount(
      {
          order:{
              numero_tramite: "DESC"
          }
      }
    );
  }
  //FIN TODOS LOS TRAMITES..............................

  //BUSCAR TRAMITES X CIUDADANO X ESTADO --- 1 NUEVO - 2 CON MEDIADOR - 3 FINALIZADO 
  async findXCiudadano(id_ciudadano: number) {
    const tramites = await this.tramiteRepository.findAndCount(
      {        
        relations: ['asignaciones','convocados','vinculados'],
        where: {
          ciudadano_id: id_ciudadano
        },
        order:{
          numero_tramite: "DESC"
        }
      }
    );   

    return tramites;
  }
  //FIN BUSCAR TRAMITES NUEVOS..........................................

  //BUSCAR TRAMITES X ESTADO --- 1 NUEVO - 2 CON MEDIADOR - 3 FINALIZADO 
  async findxestado(id_estado: number) {
    const tramites = await this.tramiteRepository.findAndCount(
      {        
        where: {
          estado_tramite_id: id_estado
        },
        order:{
          numero_tramite: "DESC"
        }
      }
    );   

    return tramites;
  }
  //FIN BUSCAR TRAMITES NUEVOS..........................................

  //BUSCAR TRAMITES X CIUDADANO X ESTADO --- 1 NUEVO - 2 CON MEDIADOR - 3 FINALIZADO 
  async findByCiudadanoByEstado(id_estado: number, id_ciudadano: number) {
    const tramites = await this.tramiteRepository.findAndCount(
      {        
        where: {
          estado_tramite_id: id_estado,
          ciudadano_id: id_ciudadano
        },
        order:{
          numero_tramite: "DESC"
        }
      }
    );   
        
    return tramites;
  }
  //FIN BUSCAR TTRAMITES X CIUDADANO X ESTADO..........................................

  //BUSCAR TRAMITES X usuario X ESTADO --- 1 NUEVO - 2 CON MEDIADOR - 3 FINALIZADO 
  async findByUsuarioByEstado(id_estado: number, id_usuario: number) { 
    let tramites_encontrados: Tramite[]=[];   
    let total_registros: number = 0;    
    let tramites: any= {};
    
    let usuario: Usuario = await this.usuarioService.findOne(id_usuario);

    //cargar tramites nuevos usuarios del interior - no son administradores
    if(id_estado === 1 && usuario.rol_id != 1){
      let usuariosCentros: [UsuarioCentro[], number] = await this.usuarioCentroService.findByUsuarioByActivo(id_usuario, true);
      let tramites_aux: any[];
      
      for (let usuarioCentro of usuariosCentros[0]){

        if(!usuarioCentro.centro_mediacion.admin_es_responsable ){
          tramites = await this.tramiteRepository.findAndCount(
            {        
              where: {
                estado_tramite_id: id_estado,
                centro_mediacion_id: usuarioCentro.centro_mediacion_id
              },
              order:{
                numero_tramite: "ASC"
              }
            }
          ); 
          tramites_aux = tramites[0];
          tramites_encontrados.push(...tramites_aux);
          total_registros = total_registros + tramites[1];
        }
      }
    }
    //FIN cargar tramites nuevos usuarios del interior - no son administradores

    // cargar tramites nuevos administrador - de capital y cercanos
    if(id_estado === 1 && usuario.rol_id === 1){  
      let tramites_aux: any[];
      // tramites = await this.tramiteRepository.findAndCount(
      //   {        
      //     where: {
      //       estado_tramite_id: id_estado,
      //       centro_mediacion_id: usuarioCentro.centro_mediacion_id
      //     },
      //     order:{
      //       numero_tramite: "DESC"
      //     }
      //   }
      // ); 

      
      tramites = await this.tramiteRepository.createQueryBuilder('tramites') 
        .leftJoinAndSelect('tramites.centro_mediacion', 'centro_mediacion')
        .leftJoinAndSelect('tramites.ciudadano', 'ciudadano')  
        .leftJoinAndSelect('tramites.objeto', 'objeto')   
        .where('centro_mediacion.admin_es_responsable = :valor', { valor: true })
        .andWhere('tramites.estado_tramite_id = :id_estado', {id_estado: 1})
        .orderBy('tramites.numero_tramite', 'ASC')
        .getManyAndCount();
    
      tramites_aux = tramites[0];
      tramites_encontrados.push(...tramites_aux);
      total_registros = total_registros + tramites[1];      
    }
    //fin cargar tramites nuevos administrador  - de capital y cercanos....

    return [tramites_encontrados, total_registros];
  }
  //FIN BUSCAR TRAMITES NUEVOS..........................................

  //CONTAR TRAMITES X ESTADO --- 1 NUEVO - 2 CON MEDIADOR - 3 FINALIZADO 
  async contarTramitesXEstado(id_estado: number) {
    const tramites = await this.tramiteRepository.count(
      {        
        where: {
          estado_tramite_id: id_estado
        }
      }
    );   

    return tramites;
  }
  //FIN BUSCAR TRAMITES NUEVOS..........................................

  //BUSCAR TRAMITES ASIGNADOS Usuario - (2 CON MEDIADOR) -  
  async findAsignadosConDatos() {
    const tramites = await this.tramiteRepository.findAndCount(
      {
        relations: ['asignaciones'], 
        where: {
          estado_tramite_id: 2,
          
        }
      }
    );   

    return tramites;
  }
  //FIN BUSCAR TRAMITES NUEVOS..........................................
  

  //BUSCAR  Xnumero tramite
  async findXNumeroTramite(numero_tramitex: number) {

    const respuesta = await this.tramiteRepository.findOne(
      {
        relations: ['asignaciones','convocados','vinculados'],
        where: {
          numero_tramite: numero_tramitex
        }
      }
    );
    if (!respuesta) throw new NotFoundException("No se encontró el registro de tramite solicitado.");
    return respuesta;
    
    
  }
  //FIN BUSCAR  Xnumero tramite..................................................................

  //BUSCAR  XID
  // async findOne(id: number) {

  //   const respuesta = await this.tramiteRepository.findOneBy({id_tramite: id});
  //   if (!respuesta) throw new NotFoundException("No se encontró el registro de tramite solicitado.");
  //   return respuesta;
  // }
  // //FIN BUSCAR  XID..................................................................

  async update(num_tramitex: number, data: UpdateTramiteDto) {
    try{
      const respuesta = await this.tramiteRepository.update({numero_tramite: num_tramitex}, data);
      if((respuesta).affected == 0) throw new NotFoundException("No se modificó el tramite.");
      return respuesta;
    }
    catch(error){
      throw new NotFoundException('Error al modificar el tramite: ',error.message);
    }
  }

  //CAMBIAR EL ESTADO DEL TRAMITE 
  async cambiarEstadoTramite(num_tramitex: number, id_estado_tramite:number) {
    let data: UpdateTramiteExpedienteDto = new UpdateTramiteExpedienteDto;
    
    const tramiteAux = await this.findXNumeroTramite(num_tramitex);

    try{

      //generar numero de expediente
      if ( id_estado_tramite === 2){

        let fecha_actual: any = new Date().toISOString().split('T')[0];
        data.fecha_expediente= fecha_actual;
        let fecha_actual_aux: Date = new Date(fecha_actual);

        data.expediente_anio = fecha_actual_aux.getFullYear();
        data.es_expediente = true;     

        let num_expediente_nuevo:number = 0;
        
        //obtener numero de expediente maximo
        const num_expediente_max = await this.tramiteRepository.createQueryBuilder('tramites')
          .select('MAX(tramites.expediente_numero)','num_max')
          .where('tramites.expediente_anio = :anio_actual', { anio_actual: data.expediente_anio })
          .getRawOne();
        
        if(!num_expediente_max) {
          num_expediente_max.num_max = 0;
        }      
        num_expediente_nuevo = num_expediente_max.num_max + 1;
    
        //cargar datos por defecto
        data.expediente_numero = num_expediente_nuevo;
        data.expediente = data.expediente_numero + "/" + data.expediente_anio        
        
      } 
      //fin generar numero de expediente

      data.estado_tramite_id=id_estado_tramite;
      const respuesta = await this.tramiteRepository.update({numero_tramite: num_tramitex}, data);
      if((respuesta).affected == 0) throw new NotFoundException("No se modificó el tramite.");
      return respuesta;
    }
    catch(error){
      if(error.code=='ER_DUP_ENTRY'){
        
        const existe = await this.tramiteRepository.findOneBy({expediente: data.expediente});
        if(existe) throw new BadRequestException ("Error al generar el número de expediente(duplicado). Intente guardar nuevamente");
      }

      throw new NotFoundException('Error al modificar el tramite: ',error.message);
    }
  }
  //FIN CAMBIAR EL ESTADO DEL TRAMITE..............................................

  //FINALIZAR TRAMITE
  async finalizarTramite(num_tramitex: number, dataTramite: UpdateTramiteFinalizacionDto) {
    //obtener cantidad de audiencias abiertas sin concluir
    const cant_audiencias_activas = await this.audienciaRepository.createQueryBuilder('audiencias')
    .select('count(audiencias.num_audiencia)','cantidad')
    .where('audiencias.tramite_numero = :tramite_num', { tramite_num: num_tramitex })
    .andWhere('audiencias.esta_cerrada= :activa', {activa: false})
    .getRawOne();
  
    if(cant_audiencias_activas.cantidad >0) throw new NotFoundException ("La ultima audiencia aun no fue cerrada.")

    //FIN obtener cantidad de audiencias abiertas sin concluir......................

    //controlar si el tramite ya esta finalizado
    const tramiteAux = await this.tramiteRepository.findOne(
      {        
        where: {
          numero_tramite: num_tramitex,
          estado_tramite_id: 3
        }
      }
    );

    if (tramiteAux) throw new NotFoundException("Este tramite ya está finalizado.");   
    
    //FIN controlar si el tramite ya esta finalizado.............................
    
    try{      
      dataTramite.estado_tramite_id = 3;
      const respuesta = await this.tramiteRepository.update({numero_tramite: num_tramitex}, dataTramite);
      if((respuesta).affected == 0) throw new NotFoundException("No se finalizó el tramite.");
      return respuesta;
    }
    catch(error){
      throw new NotFoundException('Error al finalizar el tramite: ',error.message);
    }
  }
  //FIN FINALIZAR TRAMITE...........................


  async remove(num_tramitex: number) {
    const respuesta = await this.tramiteRepository.findOneBy({numero_tramite: num_tramitex});
    if(!respuesta) throw new NotFoundException("No existe el registro de tramite que intenta eliminar");
    return await this.tramiteRepository.remove(respuesta);
  }



  //MANEJO DE ERRORES
  private handleDBErrors(error: any): never {
    if(error.code === "ER_DUP_ENTRY"){
      throw new BadRequestException (error.sqlMessage);
    }

    if(error.code === "ER_NO_REFERENCED_ROW_2"){
      throw new BadRequestException (error.sqlMessage);
    } 
    
    if(error.status == 404) throw new NotFoundException(error.response);
  
    throw new InternalServerErrorException (error.message);
    }
    //FIN MANEJO DE ERRORES........................................
}
