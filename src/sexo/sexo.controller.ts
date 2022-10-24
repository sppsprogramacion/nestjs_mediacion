import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException } from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    
    if(isNaN(Number(id))) throw new NotFoundException("El id de sexo debe ser un número.")
    let id_sexo: number = parseFloat(id);
    if(!Number.isInteger(id_sexo)) throw new NotFoundException("El id de sexo debe ser un número entero.")
    return this.sexoService.findOne(id_sexo);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dataDto: UpdateSexoDto) {
    if(isNaN(Number(id))) throw new NotFoundException("El id de sexo debe ser un número.")
    let id_sexo: number = parseFloat(id);
    if(!Number.isInteger(id_sexo)) throw new NotFoundException("El id de sexo debe ser un número entero.")
    return this.sexoService.update(id_sexo, dataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if(isNaN(Number(id))) throw new NotFoundException("El id de sexo debe ser un número.")
    let id_sexo: number = parseFloat(id);
    if(!Number.isInteger(id_sexo)) throw new NotFoundException("El id de sexo debe ser un número entero.")
    return this.sexoService.remove(id_sexo);
  }
}
