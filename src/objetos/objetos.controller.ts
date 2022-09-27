import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { Request } from 'express'
import { ObjetosService } from './objetos.service';
import { CreateObjetoDto } from './dto/create-objeto.dto';
import { UpdateObjetoDto } from './dto/update-objeto.dto';

@Controller('objetos')
export class ObjetosController {
  constructor(private readonly objetosService: ObjetosService) {}

  @Post()
  create(@Body() data: CreateObjetoDto) {
    return this.objetosService.create(data);
  }

  @Get()
  findAll() {
    return this.objetosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
    if(isNaN(Number(id))) throw new NotFoundException("El id de objeto debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id de objeto debe ser un número entero.")
    return this.objetosService.findOne(idx);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dataDto: UpdateObjetoDto) {
    if(isNaN(Number(id))) throw new NotFoundException("El id de objeto debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id de objeto debe ser un número entero.")
    return this.objetosService.update(idx, dataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if(isNaN(Number(id))) throw new NotFoundException("El id de objeto debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id de objeto debe ser un número entero.")
    return this.objetosService.remove(idx);
  }
}
