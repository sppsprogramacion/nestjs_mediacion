import { Controller, Get, Post, Body, Patch, Param, Delete, Req, NotFoundException, Put } from '@nestjs/common';
import { Request } from 'express';
import { TramitesService } from './tramites.service';
import { CreateTramiteDto } from './dto/create-tramite.dto';
import { UpdateTramiteDto } from './dto/update-tramite.dto';

@Controller('tramites')
export class TramitesController {
  constructor(private readonly tramitesService: TramitesService) {}

  @Post()
  create(@Body() data: CreateTramiteDto) {
    
    return this.tramitesService.create(data);
  }

  

  @Get()
  findAll() {
    return this.tramitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
    if(isNaN(Number(id))) throw new NotFoundException("El id del tramite debe ser un número.")
    let id_ciudadano: number = parseFloat(id);
    if(!Number.isInteger(id_ciudadano)) throw new NotFoundException("El id del tramite debe ser un número entero.")
    return this.tramitesService.findOne(id_ciudadano);
  }



  @Put(':id')
  update(@Param('id') id: string, @Body() dataDto: UpdateTramiteDto) {
    if(isNaN(Number(id))) throw new NotFoundException("El id debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id debe ser un número entero.")
    return this.tramitesService.update(idx, dataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if(isNaN(Number(id))) throw new NotFoundException("El id debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id debe ser un número entero.")
    return this.tramitesService.remove(idx);
  }
}
