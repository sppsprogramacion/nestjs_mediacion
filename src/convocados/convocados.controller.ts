import { Controller, Get, Post, Body, Patch, Param, Delete, Req, NotFoundException, Query, ParseIntPipe } from '@nestjs/common';
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
    @Query('dni', ParseIntPipe) dni: string,
    @Req()
    req: Request
  ) {
        
    return this.convocadosService.findXDni(+dni);
  }

  @Get()
  findAll() {
    return this.convocadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    
    return this.convocadosService.findOne(+id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateConvocadoDto
  ) {
    
    return this.convocadosService.update(+id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    
    return this.convocadosService.remove(+id);
  }
}
