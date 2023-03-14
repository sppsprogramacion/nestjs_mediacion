import { Controller, Get, Post, Body, Patch, Param, Delete, Req, NotFoundException, Put, ParseIntPipe } from '@nestjs/common';
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    
    return this.centrosMediacionService.findOne(id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontro la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() dataDto: UpdateCentroMediacionDto
  ) {
    
    return this.centrosMediacionService.update(id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {

    return this.centrosMediacionService.remove(id);
  }
}
