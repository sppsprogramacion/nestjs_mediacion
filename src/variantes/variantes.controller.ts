import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    
    if(isNaN(Number(id))) throw new NotFoundException("El id de variante debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id de variante debe ser un número entero.")
    return this.variantesService.findOne(idx);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dataDto: UpdateVarianteDto) {
    if(isNaN(Number(id))) throw new NotFoundException("El id de modalidad debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id de variante debe ser un número entero.")
    return this.variantesService.update(idx, dataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if(isNaN(Number(id))) throw new NotFoundException("El id de variante debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id de variante debe ser un número entero.")
    return this.variantesService.remove(idx);
  }
}
