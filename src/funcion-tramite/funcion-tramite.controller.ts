import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { FuncionTramiteService } from './funcion-tramite.service';
import { CreateFuncionTramiteDto } from './dto/create-funcion-tramite.dto';
import { UpdateFuncionTramiteDto } from './dto/update-funcion-tramite.dto';

@Controller('funcion-tramite')
export class FuncionTramiteController {
  constructor(private readonly funcionTramiteService: FuncionTramiteService) {}

  @Post()
  create(@Body() data: CreateFuncionTramiteDto) {
    return this.funcionTramiteService.create(data);
  }

  @Get()
  findAll() {
    return this.funcionTramiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
    if(isNaN(Number(id))) throw new NotFoundException("El id de la funcioncion en tramite debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id de funcion en tramite debe ser un número entero.")
    return this.funcionTramiteService.findOne(idx);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dataDto: UpdateFuncionTramiteDto) {
    if(isNaN(Number(id))) throw new NotFoundException("El id de modalidad debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id de funcion en tramite debe ser un número entero.")
    return this.funcionTramiteService.update(idx, dataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if(isNaN(Number(id))) throw new NotFoundException("El id de funcion en tramite debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id de funcion en tramite debe ser un número entero.")
    return this.funcionTramiteService.remove(idx);
  }
}
