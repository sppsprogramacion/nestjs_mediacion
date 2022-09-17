import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { ConvocadosService } from './convocados.service';
import { CreateConvocadoDto } from './dto/create-convocado.dto';
import { UpdateConvocadoDto } from './dto/update-convocado.dto';

@Controller('convocados')
export class ConvocadosController {
  constructor(private readonly convocadosService: ConvocadosService) {}

  @Post()
  create(@Body() data: CreateConvocadoDto) {
    return this.convocadosService.create(data);
  }

  @Get('buscar-xdni')  
  async findCiudadanoXDni(
    @Req()
    req: Request
  ) {
    
    if(!req.query.dni) throw new NotFoundException("El dni no fue ingresado.")
    if(isNaN(Number(req.query.dni.toString()))) throw new NotFoundException("El dni debe ser un número.")
    let dnix: number = parseFloat(req.query.dni.toString());
    if(!Number.isInteger(dnix)) throw new NotFoundException("El dni debe ser un número entero.")
    return this.convocadosService.findXDni(dnix);
  }

  @Get()
  findAll() {
    return this.convocadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
    if(isNaN(Number(id))) throw new NotFoundException("El id del convocado debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id del convocado debe ser un número entero.")
    return this.convocadosService.findOne(idx);
  }



  @Put(':id')
  update(@Param('id') id: string, @Body() dataDto: UpdateConvocadoDto) {
    if(isNaN(Number(id))) throw new NotFoundException("El id debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id debe ser un número entero.")
    return this.convocadosService.update(idx, dataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if(isNaN(Number(id))) throw new NotFoundException("El id debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id debe ser un número entero.")
    return this.convocadosService.remove(idx);
  }
}
