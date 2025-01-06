import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { EstadosTramiteService } from './estados-tramite.service';
import { CreateEstadoTramiteDto } from './dto/create-estado-tramite.dto';
import { UpdateEstadoTramiteDto } from './dto/update-estado-tramite.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards( AuthGuard() )
@Controller('estados-tramite')
export class EstadosTramiteController {
  constructor(private readonly estadosTramiteService: EstadosTramiteService) {}

  @Post()
  create(@Body() data: CreateEstadoTramiteDto) {
    return this.estadosTramiteService.create(data);
  }

  @Get()
  findAll() {
    return this.estadosTramiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    
    return this.estadosTramiteService.findOne(+id);
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
    @Body() dataDto: UpdateEstadoTramiteDto
  ) {

    return this.estadosTramiteService.update(+id, dataDto);
  }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: string) {
    
  //   return this.estadosTramiteService.remove(+id);
  // }
}
