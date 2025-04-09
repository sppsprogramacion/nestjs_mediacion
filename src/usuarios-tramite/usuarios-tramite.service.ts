import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUsuariosTramiteDto } from './dto/create-usuarios-tramite.dto';
import { UpdateUsuariosTramiteDto } from './dto/update-usuarios-tramite.dto';
import { Usuario } from '../usuario/entities/usuario.entity';
import { UsuariosTramite } from './entities/usuarios-tramite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { TramitesService } from 'src/tramites/tramites.service';
import { AudienciasService } from '../audiencias/audiencias.service';

@Injectable()
export class UsuariosTramiteService {
  constructor(
    @InjectRepository(UsuariosTramite)
    
    private readonly usuariosTramiteRepository: Repository<UsuariosTramite>,
    private readonly audienciasService: AudienciasService,
    private readonly tramiteService: TramitesService,  
    private readonly usuarioService: UsuarioService,
  ){}

  //NUEVO
  async create(data: CreateUsuariosTramiteDto): Promise<UsuariosTramite> {
    //comprobar existencia de este usuario asignado
    const existe = await this.usuariosTramiteRepository.findOne(
      {
        where:{
          tramite_numero: data.tramite_numero,
          usuario_id: data.usuario_id,
          activo: true
        }
      }
    );
    
    if(existe) throw new BadRequestException ("Este usuario ya está asignado a este tramite.");
    
    //ESTABLECER con mediador ESTADO_TRAMITE = 2 ES CON MEDIADOR   
    await this.tramiteService.cambiarEstadoTramite(data.tramite_numero,2)
    
    
    //actualizar a activo=falso a los registros con funcion mediador  cuando se asigna un mediador (solo puede haber 1)
    if( data.funcion_tramite_id === 2 ){
      try{
        const respuesta = await this.usuariosTramiteRepository.createQueryBuilder('usuario_tramite')
        .update('usuario_tramite')
        .set({activo: false})
        .where('tramite_numero = :tramite_numero',{tramite_numero: data.tramite_numero})
        .andWhere('funcion_tramite_id = :funcion_tramite_id', {funcion_tramite_id: 2})
        .execute();

        //CAMBIAR USUARIO DE LA AUDIENCIA PENDIENTE
        if((await respuesta).affected != 0){
          this.audienciasService.cambiarMediador(data.tramite_numero, data.usuario_id);

        } 

      }
      catch (error){
        this.handleDBErrors(error);
      }
    }
    
    //crear el nuevo usuario para el tramite
    try {
      const nuevo = this.usuariosTramiteRepository.create(data);
      return await this.usuariosTramiteRepository.save(nuevo);
    } catch (error) {
          
      this.handleDBErrors(error);
    }       
  }  
  //FIN NUEVO......................................................

  //DESHABILITAR USUARIO
  async deshabilitarUsuario(id_usuario_tramitex: number) {
    const usuarioTramite = await this.findOne(id_usuario_tramitex);
    if( usuarioTramite.funcion_tramite_id == 2 ){
        throw new BadRequestException("No puede deshabilitar un usuario con función de mediador")
    }
    try{
      const respuesta = await this.usuariosTramiteRepository.createQueryBuilder('usuario_tramite')
      .update('usuario_tramite')
      .set({activo: false})
      .where('id_usuario_tramite = :id_usuario_tramite',{id_usuario_tramite: id_usuario_tramitex})
      .execute();
      
      if((respuesta).affected == 0) {
        await this.findOne(id_usuario_tramitex);
      }

      return respuesta;
    }
    catch(error){
      this.handleDBErrors(error);
    }
  }
  //FIN DESHABILITAR USUARIO................

  //BUSCAR  TRAMITES X USUARIO
  async findTramitesXUsuario(id_usuario: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    const respuesta = await this.usuariosTramiteRepository.findAndCount(
      {
        where: {          
          usuario_id: id_usuario,
          activo: true
        }   
      }
    );
    
    if (!respuesta) throw new NotFoundException("No se encontró tramites para este usuario.");
    return respuesta;
  }
  //FIN BUSCAR  TRAMITES X USUARIO..................................................................

  //BUSCAR TRAMITES X USUARIO XESTADO_TRAMITE --- 1 NUEVO - 2 CON MEDIADOR - 3 FINALIZADO 
  async findTramitesXUsuarioXEstadoTramite(id_usuario:number, id_estado:number){
    
    let usuario: Usuario = await this.usuarioService.findOne(id_usuario);

    if(usuario.rol_id === "mediador"){
      const tramites = await this.usuariosTramiteRepository.createQueryBuilder('usuario_tramite')
        .leftJoinAndSelect('usuario_tramite.tramite', 'tramite') 
        .leftJoinAndSelect('tramite.ciudadano', 'ciudadano')  
        .leftJoinAndSelect('tramite.objeto', 'objeto')  
        .leftJoinAndSelect('usuario_tramite.usuario', 'usuario')
        .leftJoinAndSelect('usuario_tramite.funcion_tramite', 'funcion_tramite')
        .where('usuario_tramite.usuario_id = :id', { id: id_usuario })
        .andWhere('usuario_tramite.activo = :activox', {activox: true})
        .andWhere('tramite.estado_tramite_id = :estado_tramite_id', {estado_tramite_id: id_estado})
        .orderBy('tramite.numero_tramite', 'DESC')
        .getManyAndCount();

      return tramites;
    }

    if(usuario.rol_id === "administrador" || usuario.rol_id === "supervisor") {
      const tramites = await this.usuariosTramiteRepository.createQueryBuilder('usuario_tramite')
        .leftJoinAndSelect('usuario_tramite.tramite', 'tramite') 
        .leftJoinAndSelect('tramite.ciudadano', 'ciudadano')  
        .leftJoinAndSelect('tramite.objeto', 'objeto')  
        .leftJoinAndSelect('usuario_tramite.usuario', 'usuario')
        .leftJoinAndSelect('usuario_tramite.funcion_tramite', 'funcion_tramite')
        .where('tramite.estado_tramite_id = :estado_tramite_id', {estado_tramite_id: id_estado})
        .andWhere('usuario_tramite.activo = :activox', {activox: true})
        .andWhere('usuario_tramite.funcion_tramite_id = :funcion_tramite_id', {funcion_tramite_id: 2})
        .orderBy('tramite.numero_tramite', 'DESC')
        .getManyAndCount();
  
      return tramites;
    }
    
  }
  //FIN BUSCAR TRAMITES X USUARIO XESTADO_TRAMITE.......................................................

  //BUSCAR TRAMITES X AÑO X USUARIO XESTADO_TRAMITE --- 1 NUEVO - 2 CON MEDIADOR - 3 FINALIZADO 
  async findTramitesXUsuarioXEstadoTramiteXAnio(id_usuario:number, id_estado:number, anio: number){
    
    let usuario: Usuario = await this.usuarioService.findOne(id_usuario);

    if(usuario.rol_id === "mediador"){
      const tramites = await this.usuariosTramiteRepository.createQueryBuilder('usuario_tramite')
        .leftJoinAndSelect('usuario_tramite.tramite', 'tramite') 
        .leftJoinAndSelect('tramite.ciudadano', 'ciudadano')  
        .leftJoinAndSelect('tramite.objeto', 'objeto')  
        .leftJoinAndSelect('usuario_tramite.usuario', 'usuario')
        .leftJoinAndSelect('usuario_tramite.funcion_tramite', 'funcion_tramite')
        .where('usuario_tramite.usuario_id = :id', { id: id_usuario })
        .andWhere('usuario_tramite.activo = :activox', {activox: true})
        .andWhere('tramite.estado_tramite_id = :estado_tramite_id', {estado_tramite_id: id_estado})
        .andWhere('YEAR(tramite.fecha_tramite) = :aniox', {aniox: anio})
        .orderBy('tramite.numero_tramite', 'DESC')
        .getManyAndCount();

      return tramites;
    }

    if(usuario.rol_id === "administrador" || usuario.rol_id === "supervisor") {
      const tramites = await this.usuariosTramiteRepository.createQueryBuilder('usuario_tramite')
        .leftJoinAndSelect('usuario_tramite.tramite', 'tramite') 
        .leftJoinAndSelect('tramite.ciudadano', 'ciudadano')  
        .leftJoinAndSelect('tramite.objeto', 'objeto')  
        .leftJoinAndSelect('usuario_tramite.usuario', 'usuario')
        .leftJoinAndSelect('usuario_tramite.funcion_tramite', 'funcion_tramite')
        .where('tramite.estado_tramite_id = :estado_tramite_id', {estado_tramite_id: id_estado})
        .andWhere('usuario_tramite.activo = :activox', {activox: true})
        .andWhere('YEAR(tramite.fecha_tramite) = :aniox', {aniox: anio})
        .andWhere('usuario_tramite.funcion_tramite_id = :funcion_tramite_id', {funcion_tramite_id: 2})
        .orderBy('tramite.numero_tramite', 'DESC')
        .getManyAndCount();
  
      return tramites;
    }
    
  }
  //FIN BUSCAR TRAMITES X AÑO X USUARIO XESTADO_TRAMITE.......................................................

  
  //BUSCAR TRAMITES X AÑO X USUARIO-ADMINISTRADO XESTADO_TRAMITE --- 1 NUEVO - 2 CON MEDIADOR - 3 FINALIZADO 
  async findTramitesXUsuarioAdministradoXEstadoTramite(id_usuario:number, id_estado:number){    
        
    const tramites = await this.usuariosTramiteRepository.createQueryBuilder('usuario_tramite')
      .leftJoinAndSelect('usuario_tramite.tramite', 'tramite') 
      .leftJoinAndSelect('tramite.ciudadano', 'ciudadano')  
      .leftJoinAndSelect('tramite.objeto', 'objeto')  
      .leftJoinAndSelect('usuario_tramite.usuario', 'usuario')
      .leftJoinAndSelect('usuario_tramite.funcion_tramite', 'funcion_tramite')
      .where('usuario_tramite.usuario_id = :id', { id: id_usuario })
      .andWhere('usuario_tramite.activo = :activox', {activox: true})
      .andWhere('tramite.estado_tramite_id = :estado_tramite_id', {estado_tramite_id: id_estado})
      .orderBy('tramite.numero_tramite', 'DESC')
      .getManyAndCount();

    return tramites;
    
  }
  //FIN BUSCAR TRAMITES X AÑO X USUARIO-ADMINISTRADO XESTADO_TRAMITE....................................


  //BUSCAR TRAMITES X AÑO X USUARIO XESTADO_TRAMITE --- 1 NUEVO - 2 CON MEDIADOR - 3 FINALIZADO 
  async findTramitesXUsuarioAdministradoXEstadoTramiteXAnio(id_usuario:number, id_estado:number, anio: number){
    
    let usuario: Usuario = await this.usuarioService.findOne(id_usuario);

    const tramites = await this.usuariosTramiteRepository.createQueryBuilder('usuario_tramite')
        .leftJoinAndSelect('usuario_tramite.tramite', 'tramite') 
        .leftJoinAndSelect('tramite.ciudadano', 'ciudadano')  
        .leftJoinAndSelect('tramite.objeto', 'objeto')  
        .leftJoinAndSelect('usuario_tramite.usuario', 'usuario')
        .leftJoinAndSelect('usuario_tramite.funcion_tramite', 'funcion_tramite')
        .where('usuario_tramite.usuario_id = :id', { id: id_usuario })
        .andWhere('usuario_tramite.activo = :activox', {activox: true})
        .andWhere('tramite.estado_tramite_id = :estado_tramite_id', {estado_tramite_id: id_estado})
        .andWhere('YEAR(tramite.fecha_tramite) = :aniox', {aniox: anio})
        .orderBy('tramite.numero_tramite', 'DESC')
        .getManyAndCount();

    return tramites;
    
  }
  //FIN BUSCAR TRAMITES X USUARIO XESTADO_TRAMITE

  //BUSCAR TRAMITES X CIUDADANO
  async findTramitesXCiudadano(id_ciudadano:number){
    const tramites = await this.usuariosTramiteRepository.createQueryBuilder('usuario_tramite')
    .leftJoinAndSelect('usuario_tramite.tramite', 'tramite')    
    .leftJoinAndSelect('tramite.ciudadano', 'ciudadano')  
    .leftJoinAndSelect('tramite.objeto', 'objeto')  
    .leftJoinAndSelect('usuario_tramite.usuario', 'usuario')
    .leftJoinAndSelect('usuario_tramite.funcion_tramite', 'funcion_tramite')
    .where('tramite.ciudadano_id = :id', { id: id_ciudadano })
    .getManyAndCount();

    return tramites;
  }
  //FIN BUSCAR TRAMITES X CIUDADANO

  //BUSCAR TRAMITES X FECHA DE TRAMITE 
  async findTramitesXFechaTramite(fecha_inix: Date, fecha_finx: Date){
        
      const tramites = await this.usuariosTramiteRepository.createQueryBuilder('usuario_tramite')
        .leftJoinAndSelect('usuario_tramite.tramite', 'tramite') 
        .leftJoinAndSelect('tramite.ciudadano', 'ciudadano')  
        .leftJoinAndSelect('tramite.objeto', 'objeto')  
        .leftJoinAndSelect('usuario_tramite.usuario', 'usuario')
        .leftJoinAndSelect('usuario_tramite.funcion_tramite', 'funcion_tramite')
        .where('tramite.fecha_tramite BETWEEN :fecha_inix AND :fecha_finx', { fecha_inix, fecha_finx })
        .andWhere('usuario_tramite.activo = :activox', {activox: true})
        .andWhere('usuario_tramite.funcion_tramite_id = :funcion_tramite_id', {funcion_tramite_id: 2})
        .orderBy('tramite.numero_tramite', 'DESC')
        .getManyAndCount();
  
      return tramites;    
  }
  //FIN BUSCAR TRAMITES X FECHA DE TRAMITE .......................................................


  //BUSCAR  TRAMITES ASIGNADOS ACTIVOS
  async findTramitesActivos() {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    const respuesta = await this.usuariosTramiteRepository.findAndCount(
      {
        //relations: ['usuario','centro_mediacion'],
        where: {
          activo: true,
        }                
      }
    );
    if (!respuesta) throw new NotFoundException("No se encontró el tramites para este usuario.");
    return respuesta;
  }
  //FIN BUSCAR  TRAMITES ASIGNADOS ACTIVOS..................................................................

  //BUSCAR  XNUMTRAMITE
  async findByNumTramiteActivo(num_tramite: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    const respuesta = await this.usuariosTramiteRepository.findAndCount(
      {
        //relations: ['tramite'],
        where: {          
          tramite_numero: num_tramite,
          activo: true
        }      
          
      }
    );
    
    if (!respuesta) throw new NotFoundException("No se encontró el registro con este numero de tramite.");
    return respuesta;
  }
  //FIN BUSCAR  XNUMTRAMITE..................................................................

  //BUSCAR MEDIADOR  XNUMTRAMITE
  async findMediadorByNumTramiteActivo(num_tramite: number) {    
    const respuesta = await this.usuariosTramiteRepository.findOne(
      {
        //relations: ['tramite'],
        where: {          
          tramite_numero: num_tramite,
          funcion_tramite_id: 2,
          activo: true
        }      
          
      }
    );
    
    if (!respuesta) throw new NotFoundException("No se encontró el registro con este numero de tramite.");
    return respuesta;
  }
  //FIN BUSCAR MEDIADOR XNUMTRAMITE..................................................................
  
  async findAll() {
    return await this.usuariosTramiteRepository.findAndCount(
      {
        //relations: ['usuario','centro_mediacion'],
        where:{
          activo: true
        },
        order:{
            id_usuario_tramite: "ASC"
        }
      }
    );
  }

  
  //BUSCAR  XID
  async findOne(id: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    const respuesta = await this.usuariosTramiteRepository.findOne(
      {
        //relations: ['usuario','centro_mediacion'],
        where: {
          id_usuario_tramite: id,
        }      
          
      }
    );
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................  

  //MODIFICAR
  async update(id: number, data: UpdateUsuariosTramiteDto) {
    try{
      const respuesta = await this.usuariosTramiteRepository.update({id_usuario_tramite: id}, data);
      if((respuesta).affected == 0) {
        await this.findOne(id);
      }

      return respuesta;
    }
    catch(error){
      this.handleDBErrors(error);
    }
  }
  //FIN MODIFICAR................

  async remove(id: number) {
    const respuesta = await this.usuariosTramiteRepository.findOneBy({id_usuario_tramite: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de usuario-tramite que intenta eliminar");
    return await this.usuariosTramiteRepository.remove(respuesta);
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
