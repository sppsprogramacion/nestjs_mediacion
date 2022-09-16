import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { CiudadanosService } from './ciudadanos.service';
import { CreateCiudadanoDto } from './dto/create-ciudadano.dto';
import { UpdateCiudadanoDto } from './dto/update-ciudadano.dto';

@Controller('ciudadanos')
export class CiudadanosController {
  constructor(private readonly ciudadanosService: CiudadanosService) {}

  @Post()
  create(@Body() data: CreateCiudadanoDto) {
    return this.ciudadanosService.create(data);
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
    return this.ciudadanosService.findXDni(dnix);
  }

  @Get()
  findAll() {
    return this.ciudadanosService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
    
  //   if(isNaN(Number(id))) throw new NotFoundException("El id del ciudadano debe ser un número.")
  //   let id_ciudadano: number = parseFloat(id);
  //   if(!Number.isInteger(id_ciudadano)) throw new NotFoundException("El id del ciudadano debe ser un número entero.")
  //   return this.ciudadanosService.findOne(id_ciudadano);
  // }



  @Put(':dni')
  update(@Param('dni') dni: string, @Body() dataDto: UpdateCiudadanoDto) {
    if(isNaN(Number(dni))) throw new NotFoundException("El dni debe ser un número.")
    let dnix: number = parseFloat(dni);
    if(!Number.isInteger(dnix)) throw new NotFoundException("El dni debe ser un número entero.")
    return this.ciudadanosService.update(dnix, dataDto);
  }

  @Delete(':id')
  remove(@Param('dni') dni: string) {
    if(isNaN(Number(dni))) throw new NotFoundException("El dni debe ser un número.")
    let dnix: number = parseFloat(dni);
    if(!Number.isInteger(dnix)) throw new NotFoundException("El dni debe ser un número entero.")
    return this.ciudadanosService.remove(dnix);
  }
  
}
