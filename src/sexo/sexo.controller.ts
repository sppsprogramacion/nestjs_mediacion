import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { SexoService } from './sexo.service';
import { CreateSexoDto } from './dto/create-sexo.dto';
import { UpdateSexoDto } from './dto/update-sexo.dto';

@Controller('sexo')
export class SexoController {
  constructor(private readonly sexoService: SexoService) {}

  @Post()
  create(@Body() data: CreateSexoDto) {
    return this.sexoService.create(data);
  }

  @Get()
  findAll() {
    return this.sexoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    
    return this.sexoService.findOne(id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() dataDto: UpdateSexoDto
  ) {
    
    return this.sexoService.update(id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
   
    return this.sexoService.remove(id);
  }
}
