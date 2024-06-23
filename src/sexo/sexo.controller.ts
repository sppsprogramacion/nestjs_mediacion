import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { SexoService } from './sexo.service';
import { CreateSexoDto } from './dto/create-sexo.dto';
import { UpdateSexoDto } from './dto/update-sexo.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('sexo')
export class SexoController {
  constructor(private readonly sexoService: SexoService) {}

  @Post()
  create(@Body() data: CreateSexoDto) {
    return this.sexoService.create(data);
  }

  @Get()
  //@UseGuards( AuthGuard() )
  findAll() {
    return this.sexoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    
    return this.sexoService.findOne(+id);
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
    @Body() dataDto: UpdateSexoDto
  ) {
    
    return this.sexoService.update(+id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
   
    return this.sexoService.remove(+id);
  }
}
