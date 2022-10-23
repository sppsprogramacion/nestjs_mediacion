import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { EstadosTramiteService } from './estados-tramite.service';
import { CreateEstadoTramiteDto } from './dto/create-estado-tramite.dto';
import { UpdateEstadoTramiteDto } from './dto/update-estado-tramite.dto';

@Controller('estados-tramite')
export class EstadosTramiteController {
  constructor(private readonly estadosTramiteService: EstadosTramiteService) {}

  @Post()
  create(@Body() data: CreateEstadoTramiteDto) {
    return this.estadosTramiteService.create(data);
  }

  @Get()
  findAll() {
    return this.estadosTramiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
    if(isNaN(Number(id))) throw new NotFoundException("El id de estado de tramite debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id de estado de tramite debe ser un número entero.")
    return this.estadosTramiteService.findOne(idx);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dataDto: UpdateEstadoTramiteDto) {
    if(isNaN(Number(id))) throw new NotFoundException("El id de estado de tramite debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id de estado de tramite debe ser un número entero.")
    return this.estadosTramiteService.update(idx, dataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if(isNaN(Number(id))) throw new NotFoundException("El id de estado de tramite debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id de estado de tramite debe ser un número entero.")
    return this.estadosTramiteService.remove(idx);
  }
}
