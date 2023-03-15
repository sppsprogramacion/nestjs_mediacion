import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put, ParseIntPipe } from '@nestjs/common';
import { ModalidadService } from './modalidad.service';
import { CreateModalidadDto } from './dto/create-modalidad.dto';
import { UpdateModalidadDto } from './dto/update-modalidad.dto';

@Controller('modalidad')
export class ModalidadController {
  constructor(private readonly modalidadService: ModalidadService) {}

  @Post()
  create(@Body() data: CreateModalidadDto) {
    return this.modalidadService.create(data);
  }

  @Get()
  findAll() {
    return this.modalidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    
    return this.modalidadService.findOne(id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  @Put(':id')
  update(
    @Param('id') id: number, 
    @Body() dataDto: UpdateModalidadDto) {
    
    return this.modalidadService.update(id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    
    return this.modalidadService.remove(id);
  }
}
