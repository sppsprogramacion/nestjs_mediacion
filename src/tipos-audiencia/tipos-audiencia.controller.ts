import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { TiposAudienciaService } from './tipos-audiencia.service';
import { CreateTipoAudienciaDto } from './dto/create-tipo-audiencia.dto';
import { UpdateTipoAudienciaDto } from './dto/update-tipo-audiencia.dto';

@Controller('tipos-audiencia')
export class TiposAudienciaController {
  constructor(private readonly tiposAudienciaService: TiposAudienciaService) {}

  @Post()
  create(@Body() data: CreateTipoAudienciaDto) {
    return this.tiposAudienciaService.create(data);
  }

  @Get()
  findAll() {
    return this.tiposAudienciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    
    return this.tiposAudienciaService.findOne(+id);
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
    @Body() dataDto: UpdateTipoAudienciaDto
  ) {
    
    return this.tiposAudienciaService.update(+id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    
    return this.tiposAudienciaService.remove(+id);
  }
}
