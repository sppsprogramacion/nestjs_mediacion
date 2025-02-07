import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UsuariosTramiteService } from './usuarios-tramite.service';
import { CreateUsuariosTramiteDto } from './dto/create-usuarios-tramite.dto';
import { UpdateUsuariosTramiteDto } from './dto/update-usuarios-tramite.dto';
import { TramitesService } from '../tramites/tramites.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards( AuthGuard() )
@Controller('usuarios-tramite')
export class UsuariosTramiteController {
  constructor(
    private readonly usuariosTramiteService: UsuariosTramiteService,
    private readonly tramiteService: TramitesService  
  ) {}

  @Post()
  async create(@Body() data: CreateUsuariosTramiteDto) {
    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];
    data.fecha_asignacion= fecha_actual;
    data.fecha_sece = null;

    const usuarioTramite = this.usuariosTramiteService.create(data);
    //ESTABLECER con mediador
    // if(usuarioTramite){      
    //   this.tramiteService.cambiarEstadoTramite(data.tramite_numero,2)
    // }
    return usuarioTramite;
  }

  //BUSCAR TRAMITES POR ID-USUARIO
  @Get('buscar-xusuario')  
  async findTramiteXUsuario(
    @Query('id_usuario', ParseIntPipe) id_usuario: string, 
  ) {
    let id_usuariox: number = +id_usuario;

    if (id_usuariox === 0) return this.usuariosTramiteService.findTramitesActivos();

    return this.usuariosTramiteService.findTramitesXUsuario(id_usuariox);
  }
  //FIN BUSCAR TRAMITES POR ID-USUARIO....................................................

  //BUSCAR TRAMITES ASIGNADOS POR ID-USUARIO y estado del tramite 1 NUEVO - 2 CON MEDIADOR - 3 FINALIZADO
  @Get('buscar-xusuario-asignados')  
  async findTramiteXUsuarioAsignados(
    @Query('id_usuario', ParseIntPipe) id_usuario: string, 
  ) {
    let id_usuariox: number = +id_usuario;

    return this.usuariosTramiteService.findTramitesXUsuarioXEstadoTramite(id_usuariox,2);
  }
  //FIN BUSCAR TRAMITES ASIGNADOS POR ID-USUARIO....................................................

  //BUSCAR TRAMITES ASIGNADOS POR USUARIO-ADMINISTRADO y estado del tramite 1 NUEVO - 2 CON MEDIADOR - 3 FINALIZADO
  @Get('buscar-xusuarioadministrado-asignados')  
  async findTramiteXUsuarioAdministradoAsignados(
    @Query('id_usuario', ParseIntPipe) id_usuario: string
  ) {
    let id_usuariox: number = +id_usuario;
    
    return this.usuariosTramiteService.findTramitesXUsuarioAdministradoXEstadoTramite(id_usuariox,2);
  }
  //FIN BUSCAR TRAMITES ASIGNADOS POR USUARIO-ADMINISTRADO y estado del tramite....................................................

  //BUSCAR TRAMITES FINALIZADOS POR ID-USUARIO y estado del tramite 1 NUEVO - 2 CON MEDIADOR - 3 FINALIZADO
  //utilizado para que los usuarios logueados obtengan todos sus tramites finalizados. El admministrador ve todos.
  @Get('buscar-xusuario-finalizados')  
  async findTramiteXUsuarioFinalizados(
    @Query('id_usuario', ParseIntPipe) id_usuario: string, 
  ) {
    let id_usuariox: number = +id_usuario;

    return this.usuariosTramiteService.findTramitesXUsuarioXEstadoTramite(id_usuariox,3);
  }
  //FIN BUSCAR TRAMITES FINALIZADOS POR ID-USUARIO....................................................

  //BUSCAR TRAMITES FINALIZADOS POR USUARIO POR ANIO y estado del tramite 1 NUEVO - 2 CON MEDIADOR - 3 FINALIZADO
  //utilizado para que los usuarios logueados obtengan todos sus tramites finalizados por año especificado. El admministrador ve todos.
  @Get('buscar-xusuario-finalizados-xanio')  
  async findTramiteXUsuarioFinalizadosXanio(
    @Query('id_usuario', ParseIntPipe) id_usuario: string, 
    @Query('anio', ParseIntPipe) anio: string, 
  ) {
    let id_usuariox: number = +id_usuario;
    let aniox: number = +anio;
    
    return this.usuariosTramiteService.findTramitesXUsuarioXEstadoTramiteXAnio(id_usuariox,3,aniox);
  }
  //BUSCAR TRAMITES FINALIZADOS POR USUARIO POR ANIO y estado del tramite....................................................

  
  //BUSCAR TRAMITES FINALIZADOS POR USUARIO-ADMINISTRADO y estado del tramite 1 NUEVO - 2 CON MEDIADOR - 3 FINALIZADO
  //utilizado por el administrador para ver todos los tramites del usuario que esta administrando
  @Get('buscar-xusuarioadministrado-finalizados')  
  async findTramiteXUsuarioAdministradoFinalizados(
    @Query('id_usuario', ParseIntPipe) id_usuario: string, 
  ) {
    let id_usuariox: number = +id_usuario;

    return this.usuariosTramiteService.findTramitesXUsuarioAdministradoXEstadoTramite(id_usuariox,3);
  }
  //FIN BUSCAR TRAMITES FINALIZADOS POR USUARIO-ADMINISTRADO....................................................
  

  //BUSCAR TRAMITES FINALIZADOS POR USUARIO-ADMINISTRADO POR ANIO y estado del tramite 1 NUEVO - 2 CON MEDIADOR - 3 FINALIZADO
  //utilizado por el administrador para ver los tramites segun un anio especificado del usuario que esta administrando
  @Get('buscar-xusuarioadministrado-finalizados-xanio')  
  async findTramiteXUsuarioAdministradoFinalizadosXanio(
    @Query('id_usuario', ParseIntPipe) id_usuario: string, 
    @Query('anio', ParseIntPipe) anio: string, 
  ) {
    let id_usuariox: number = +id_usuario;
    let aniox: number = +anio;
    
    return this.usuariosTramiteService.findTramitesXUsuarioAdministradoXEstadoTramiteXAnio(id_usuariox,3,aniox);
  }
  //BUSCAR TRAMITES FINALIZADOS POR USUARIO-ADMINISTRADO POR ANIO y estado del tramite....................................................

  //BUSCAR TRAMITES x numero de tramite
  @Get('buscar-xnumtramite-activo')  
  async findTramiteXNumero(
    @Query('numero_tramite', ParseIntPipe) numero_tramite: string, 
  ) {
    let numero_tramitex: number = +numero_tramite;

    return this.usuariosTramiteService.findByNumTramiteActivo(numero_tramitex);
  }
  //FIN BUSCAR TRAMITES x numero de tramite....................................................

  //BUSCAR mediador del tramite x numero de tramite
  @Get('buscar-mediador-xnumtramite-activo')  
  async findMediadorTramiteXNumeroTram(
    @Query('numero_tramite', ParseIntPipe) numero_tramite: string, 
  ) {
    let numero_tramitex: number = +numero_tramite;

    return this.usuariosTramiteService.findMediadorByNumTramiteActivo(numero_tramitex);
  }
  //FIN BUSCAR mediador del tramite x numero de tramite....................................................

  //BUSCAR TRAMITES ASIGNADOS POR CIUDADANO
  @Get('buscar-xciudadano')  
  async findTramiteXCiudadano(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string, 
  ) {    
    let id_ciudadanox: number = +id_ciudadano;

    if (id_ciudadanox === 0) return this.usuariosTramiteService.findTramitesActivos();

    return this.usuariosTramiteService.findTramitesXCiudadano(id_ciudadanox);
  }
  //FIN BUSCAR TRAMITES ASIGNADOS POR CIUDADANO....................................................

  //BUSCAR TRAMITES ASIGNADOS   ACTIVOS
  @Get('buscar-activos')  
  async findTramitesActivos() 
  {    
    return this.usuariosTramiteService.findTramitesActivos();
  }
  //FIN BUSCAR TRAMITES ASIGNADOS ACTIVOS....................................................

  //TODAS LAS ASIGNACIONES
  @Get()
  findAll() {
    return this.usuariosTramiteService.findAll();
  }
  //FIN TODAS LAS ASIGNACIONES

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    
    return this.usuariosTramiteService.findOne(+id);
  }

  //DESHABILITAR USUARIO
  @Patch('deshabilitar-usuario')
  async deshabilitarUsuario(    
    @Query('id_usuario_tramite', ParseIntPipe) id_usuario_tramite: string,
    @Body() dataDtox: UpdateUsuariosTramiteDto
  ) {
    
    return this.usuariosTramiteService.deshabilitarUsuario(+id_usuario_tramite);    
  }
  //FIN //DESHABILITAR USUARIO........................................................

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateUsuariosTramiteDto) {
    
      return this.usuariosTramiteService.update(+id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    
    return this.usuariosTramiteService.remove(+id);
  }
}
