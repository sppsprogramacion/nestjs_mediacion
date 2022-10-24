import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException, Put } from '@nestjs/common';
import { ProvinciasService } from './provincias.service';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';

@Controller('provincias')
export class ProvinciasController {
  constructor(private readonly provinciasService: ProvinciasService) {}

  @Post()
  create(@Body() data: CreateProvinciaDto) {
    return this.provinciasService.create(data);
  }

  @Get()
  findAll() {
    return this.provinciasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
    if(isNaN(Number(id))) throw new NotFoundException("El id de la provincia debe ser un número.")
    let id_provincia: number = parseFloat(id);
    if(!Number.isInteger(id_provincia)) throw new NotFoundException("El id de la provincia debe ser un número entero.")
    return this.provinciasService.findOne(id_provincia);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dataDto: UpdateProvinciaDto) {
    if(isNaN(Number(id))) throw new NotFoundException("El id de la provincia debe ser un número.")
    let id_provincia: number = parseFloat(id);
    if(!Number.isInteger(id_provincia)) throw new NotFoundException("El id de la provincia debe ser un número entero.")
    return this.provinciasService.update(id_provincia, dataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if(isNaN(Number(id))) throw new NotFoundException("El id de la provincia debe ser un número.")
    let id_provincia: number = parseFloat(id);
    if(!Number.isInteger(id_provincia)) throw new NotFoundException("El id de la provincia debe ser un número entero.")
    return this.provinciasService.remove(id_provincia);
  }
}
