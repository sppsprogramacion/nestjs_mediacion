import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { UsuariosTramiteService } from './usuarios-tramite.service';
import { CreateUsuariosTramiteDto } from './dto/create-usuarios-tramite.dto';
import { UpdateUsuariosTramiteDto } from './dto/update-usuarios-tramite.dto';
import { UsuariosTramite } from './entities/usuarios-tramite.entity';
import { TramitesService } from '../tramites/tramites.service';
import { UpdateTramiteDto } from '../tramites/dto/update-tramite.dto';
import { Tramite } from 'src/tramites/entities/tramite.entity';

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
    data.activo=true;

    const usuarioTramite = this.usuariosTramiteService.create(data);
    //ESTABLECER con mediador
    if(usuarioTramite){      
      this.tramiteService.cambiarEstadoTramite(data.tramite_numero,2)
    }
    return usuarioTramite;
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
