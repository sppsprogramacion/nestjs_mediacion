import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, UseGuards } from '@nestjs/common';
import { ResultadosAudienciaService } from './resultados-audiencia.service';
import { CreateResultadoAudienciaDto } from './dto/create-resultado-audiencia.dto';
import { UpdateResultadoAudienciaDto } from './dto/update-resultado-audiencia.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards( AuthGuard() )
@Controller('resultados-audiencia')
export class ResultadosAudienciaController {
  constructor(private readonly resultadosAudienciaService: ResultadosAudienciaService) {}

  @Post()
  create(@Body() data: CreateResultadoAudienciaDto) {
    return this.resultadosAudienciaService.create(data);
  }

  @Get()
  findAll() {
    return this.resultadosAudienciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    return this.resultadosAudienciaService.findOne(+id);
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
    @Body() dataDto: UpdateResultadoAudienciaDto
  ) {
    
    return this.resultadosAudienciaService.update(+id, dataDto);
  }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: string) {
    
  //   return this.resultadosAudienciaService.remove(+id);
  // }
}
