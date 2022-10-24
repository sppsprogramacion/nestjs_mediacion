import { Controller, Get, Post, Body, Patch, Param, Delete, Req, NotFoundException, Put } from '@nestjs/common';
import { Request } from 'express';
import { CentrosMediacionService } from './centros-mediacion.service';
import { CreateCentroMediacionDto } from './dto/create-centro-mediacion.dto';
import { UpdateCentroMediacionDto } from './dto/update-centro-mediacion.dto';

@Controller('centros-mediacion')
export class CentrosMediacionController {
  constructor(private readonly centrosMediacionService: CentrosMediacionService) {}

  @Post()
  create(@Body() data: CreateCentroMediacionDto) {
    return this.centrosMediacionService.create(data);
  }
  

  @Get()
  findAll() {
    return this.centrosMediacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
    if(isNaN(Number(id))) throw new NotFoundException("El id del centro de mediación debe ser un número.")
    let id_centro: number = parseFloat(id);
    if(!Number.isInteger(id_centro)) throw new NotFoundException("El id del centro de mediació debe ser un número entero.")
    return this.centrosMediacionService.findOne(id_centro);
  }



  @Put(':id')
  update(@Param('id') id: string, @Body() dataDto: UpdateCentroMediacionDto) {
    if(isNaN(Number(id))) throw new NotFoundException("El id debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id debe ser un número entero.")
    return this.centrosMediacionService.update(idx, dataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if(isNaN(Number(id))) throw new NotFoundException("El id debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id debe ser un número entero.")
    return this.centrosMediacionService.remove(idx);
  }
}
