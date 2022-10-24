import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { UsuariosTramiteService } from './usuarios-tramite.service';
import { CreateUsuariosTramiteDto } from './dto/create-usuarios-tramite.dto';
import { UpdateUsuariosTramiteDto } from './dto/update-usuarios-tramite.dto';

@Controller('usuarios-tramite')
export class UsuariosTramiteController {
  constructor(private readonly usuariosTramiteService: UsuariosTramiteService) {}

  @Post()
  create(@Body() data: CreateUsuariosTramiteDto) {
    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];
    data.fecha_asignacion= fecha_actual;
    data.fecha_sece = null;
    data.activo=true;

    return this.usuariosTramiteService.create(data);
  }

  @Get()
  findAll() {
    return this.usuariosTramiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
    if(isNaN(Number(id))) throw new NotFoundException("El id del usuario-tramite debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id del usuario-tramite debe ser un número entero.")
    return this.usuariosTramiteService.findOne(idx);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dataDto: UpdateUsuariosTramiteDto) {
    if(isNaN(Number(id))) throw new NotFoundException("El id usuario-tramite debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id usuario-tramite debe ser un número entero.")
    return this.usuariosTramiteService.update(idx, dataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if(isNaN(Number(id))) throw new NotFoundException("El id de usuariosTramiteService debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id de usuariosTramiteService debe ser un número entero.")
    return this.usuariosTramiteService.remove(idx);
  }
}
