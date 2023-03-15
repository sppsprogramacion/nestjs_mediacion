import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put, ParseIntPipe } from '@nestjs/common';
import { VariantesService } from './variantes.service';
import { CreateVarianteDto } from './dto/create-variante.dto';
import { UpdateVarianteDto } from './dto/update-variante.dto';

@Controller('variantes')
export class VariantesController {
  constructor(private readonly variantesService: VariantesService) {}

  @Post()
  create(@Body() data: CreateVarianteDto) {
    return this.variantesService.create(data);
  }

  @Get()
  findAll() {
    return this.variantesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    
    return this.variantesService.findOne(id);
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
    @Body() dataDto: UpdateVarianteDto
  ) {
    
    return this.variantesService.update(id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    
    return this.variantesService.remove(id);
  }
}
