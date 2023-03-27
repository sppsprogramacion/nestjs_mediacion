import { Controller, Get, Post, Body, Patch, Param, Delete, Req, NotFoundException, Put } from '@nestjs/common';
import { Request } from 'express';
import { UsuariosCentrosService } from './usuarios-centros.service';
import { CreateUsuarioCentroDto } from './dto/create-usuario-centro.dto';
import { UpdateUsuarioCentroDto } from './dto/update-usuario-centro.dto';

@Controller('usuarios-centros')
export class UsuariosCentrosController {
  constructor(private readonly usuariosCentrosService: UsuariosCentrosService) {}

  @Post()
  create(@Body() data: CreateUsuarioCentroDto) {
    let fecha_actual: any = new Date().toISOString().split('T')[0];
    data.fecha_designacion = fecha_actual;
    
    return this.usuariosCentrosService.create(data);
  }

  @Get()
  findAll() {
    return this.usuariosCentrosService.findAll();
  }

  //BUSCAR  XID DEL CENTRO DE MEDIACION
  @Get('buscar-xcentro-mediacion')  
  async findXCentroMEdiacion(
    @Req()
    req: Request
  ) {    
    if(!req.query.id_centro) throw new NotFoundException("El id del centro no fue ingresado.")
    if(isNaN(Number(req.query.id_centro.toString()))) throw new NotFoundException("El id del centro debe ser un número.")
    let id_centrox: number = parseFloat(req.query.id_centro.toString());
    if(!Number.isInteger(id_centrox)) throw new NotFoundException("El id del centro debe ser un número entero.")
    return this.usuariosCentrosService.findXCentroMediacion(id_centrox);
  }
  //FIN BUSCAR  XI DEL CENTRO DE MEDIACION....................................................

  @Get('buscar-activos-xcentro-mediacion')  
  async findActivosXCentroMediacion(
    @Req()
    req: Request
  ) {    
    if(!req.query.id_centro) throw new NotFoundException("El id del centro no fue ingresado.")
    if(isNaN(Number(req.query.id_centro.toString()))) throw new NotFoundException("El id del centro debe ser un número.")
    let id_centrox: number = parseFloat(req.query.id_centro.toString());
    if(!Number.isInteger(id_centrox)) throw new NotFoundException("El id del centro debe ser un número entero.")
    return this.usuariosCentrosService.findXCentroMediacionXActivo(id_centrox, true);
  }
  //FIN BUSCAR  XI DEL CENTRO DE MEDIACION....................................................

  @Get(':id')
  findOne(@Param('id') id: string) {
    
    if(isNaN(Number(id))) throw new NotFoundException("El id del usuario-centro debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id del usuario-centro debe ser un número entero.")
    return this.usuariosCentrosService.findOne(idx);
  }

  //SALIDA MOVIMIENTO DEL TRAMITE
  @Put('deshabilitar-usuario')
  async deshabilitarUsuario(    
    @Req()
    req: Request,
    @Body() dataDtox: UpdateUsuarioCentroDto
  ) {
    console.log("habilitado: ", req.query.habilitado);
    if (isNaN(Number(req.query.id_usuario_centro))) throw new NotFoundException("El número de id del usuario-centro debe ser un número");
    let idx: number = parseFloat(req.query.id_usuario_centro.toString());    
    if(!Number.isInteger(idx)) throw new NotFoundException("el id de usuario centro debe ser un número entero");
    
    let dataDto: UpdateUsuarioCentroDto = new UpdateUsuarioCentroDto();
    dataDto.activo = false;

    return this.usuariosCentrosService.update(idx,dataDto);
    
  }
  //FIN SALIDA MOVIMIENTO DEL TRAMITE........................................................

  @Put(':id')
  update(@Param('id') id: string, @Body() dataDto: UpdateUsuarioCentroDto) {
    if(isNaN(Number(id))) throw new NotFoundException("El id debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id debe ser un número entero.")
    return this.usuariosCentrosService.update(idx, dataDto);
  }

  // @Put(':id')
  // deshabilitarUsuariox(
  //   @Param('id') id: string, 
  //   @Body() dataDto: UpdateUsuarioCentroDto
  // ) {
  //   if(isNaN(Number(id))) throw new NotFoundException("El id debe ser un númerox.")
  //   let idx: number = parseFloat(id);
  //   if(!Number.isInteger(idx)) throw new NotFoundException("El id debe ser un número enterox.")
    
  //   return this.usuariosCentrosService.update(idx, dataDto);
  // }

  

  @Delete(':id')
  remove(@Param('id') id: string) {
    if(isNaN(Number(id))) throw new NotFoundException("El id debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id debe ser un número entero.")
    return this.usuariosCentrosService.remove(idx);
  }
}
