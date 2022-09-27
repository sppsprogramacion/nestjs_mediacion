import { Controller, Get, Post, Body, Patch, Param, Delete, Req, NotFoundException, Put } from '@nestjs/common';
import { Request } from 'express'
import { VinculdadosService } from './vinculdados.service';
import { CreateVinculdadoDto } from './dto/create-vinculdado.dto';
import { UpdateVinculdadoDto } from './dto/update-vinculdado.dto';

@Controller('vinculdados')
export class VinculdadosController {
  constructor(private readonly vinculdadosService: VinculdadosService) {}

  @Post()
  create(@Body() data: CreateVinculdadoDto) {
    return this.vinculdadosService.create(data);
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
    return this.vinculdadosService.findXDni(dnix);
  }

  @Get()
  findAll() {
    return this.vinculdadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
    if(isNaN(Number(id))) throw new NotFoundException("El id del vinculado debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id del vinculado debe ser un número entero.")
    return this.vinculdadosService.findOne(idx);
  }



  @Put(':id')
  update(@Param('id') id: string, @Body() dataDto: UpdateVinculdadoDto) {
    if(isNaN(Number(id))) throw new NotFoundException("El id debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id debe ser un número entero.")
    return this.vinculdadosService.update(idx, dataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if(isNaN(Number(id))) throw new NotFoundException("El id debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id debe ser un número entero.")
    return this.vinculdadosService.remove(idx);
  }
}
