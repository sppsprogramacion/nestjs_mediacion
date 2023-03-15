import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put, ParseIntPipe } from '@nestjs/common';
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    
    return this.funcionTramiteService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number, 
    @Body() dataDto: UpdateFuncionTramiteDto
  ) {
    
    return this.funcionTramiteService.update(id, dataDto);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    
    return this.funcionTramiteService.remove(id);
  }
}
