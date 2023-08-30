import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { AudienciasService } from './audiencias.service';
import { CreateAudienciaDto } from './dto/create-audiencia.dto';
import { UpdateAudienciaDto } from './dto/update-audiencia.dto';

@Controller('audiencias')
export class AudienciasController {
  constructor(private readonly audienciasService: AudienciasService) {}

  @Post()
  create(@Body() data: CreateAudienciaDto) {
    return this.audienciasService.create(data);
  }

  @Get()
  findAll() {
    return this.audienciasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    
    return this.audienciasService.findOne(+id);
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
    @Body() dataDto: UpdateAudienciaDto
  ) {
    
    return this.audienciasService.update(+id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    
    return this.audienciasService.remove(+id);
  }

}
