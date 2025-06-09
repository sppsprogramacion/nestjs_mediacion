import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Query, UseGuards } from '@nestjs/common';
import { AudienciasService } from './audiencias.service';
import { CreateAudienciaDto } from './dto/create-audiencia.dto';
import { UpdateAudienciaDto } from './dto/update-audiencia.dto';
import { UpdateAudienciaResultadoDto } from './dto/update-audiencia-resultado.dto';
import { AuthGuard } from '@nestjs/passport';
import { DateValidationPipe } from 'src/pipes/date-validation.pipe';


@UseGuards( AuthGuard() )
@Controller('audiencias')
export class AudienciasController {
  constructor(private readonly audienciasService: AudienciasService) {}

  @Post()
  create(@Body() data: CreateAudienciaDto) {
    return this.audienciasService.create(data);
  }

  
  //BUSCAR TRAMITES TODOS X fecha audiencia
  @Get('todos-xfecha-audiencia')
  async findTodosXFechaAudiencia(  
    @Query('fecha_ini', DateValidationPipe) fecha_ini: string,
    @Query('fecha_fin', DateValidationPipe) fecha_fin: string  
  ) {    
    
    const f_inicio = new Date(fecha_ini);
    const f_fin = new Date(fecha_fin);
    // Aquí ya tienes la fecha validada

    return this.audienciasService.findByFechaAudiencia(f_inicio, f_fin);
  }
  //FIN BUSCAR TRAMITES TODOS X fecha audiencia.....................................................
  
  //BUSCAR TRAMITES TODOS X FECHA
  @Get('todos-xfecha-excel')
  async findTodosXFechaExcel(  
    @Query('fecha_ini', DateValidationPipe) fecha_ini: string,
    @Query('fecha_fin', DateValidationPipe) fecha_fin: string  
  ) {    
    
    const f_inicio = new Date(fecha_ini);
    const f_fin = new Date(fecha_fin);
    // Aquí ya tienes la fecha validada

    return this.audienciasService.findByFechaAudiencia(f_inicio, f_fin);
  }
  //FIN BUSCAR TRAMITES TODOS X FECHA.....................................................

  @Get()
  findAll() {
    return this.audienciasService.findAll();
  }

  //BUSCAR AUDIENCIAS POR USUARIO
  @Get('buscar-abiertas-xusuario')
  async findByCiudadano( 
    @Query('id_usuario', ParseIntPipe) id_usuario: string,   
  ) {  
    let id_usuariox: number = +id_usuario;

    return this.audienciasService.findByUsuario(id_usuariox);
  } 
  //FIN BUSCAR AUDIENCIAS POR USUARIO.......................................

  //BUSCAR AUDIENCIAS POR TRAMITE
  @Get('buscar-xtramite')
  async findByTramite( 
    @Query('id_tramite', ParseIntPipe) id_tramite: string,   
  ) {  
    let id_tramitex: number = +id_tramite;

    return this.audienciasService.findByTramite(id_tramitex);
  } 
  //FIN BUSCAR TAUDIENCIAS POR TRAMITE.......................................


  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    
    return this.audienciasService.findOne(+id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  @Patch('resultado/:id')
  resultadoAudiencia(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateAudienciaResultadoDto
  ) {
    
    return this.audienciasService.resultadoAudiencia(+id, dataDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateAudienciaDto
  ) {
    
    return this.audienciasService.update(+id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    
    return this.audienciasService.remove(+id);
  }

}
