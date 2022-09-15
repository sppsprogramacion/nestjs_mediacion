import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';

@Controller('departamentos')
export class DepartamentosController {
  constructor(private readonly departamentosService: DepartamentosService) {}

  @Post()
  create(@Body() data: CreateDepartamentoDto) {
    return this.departamentosService.create(data);
  }

  @Get()
  findAll() {
    return this.departamentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
    if(isNaN(Number(id))) throw new NotFoundException("El id del departamento debe ser un número.")
    let id_departamento: number = parseFloat(id);
    if(!Number.isInteger(id_departamento)) throw new NotFoundException("El id del departamento debe ser un número entero.")
    return this.departamentosService.findOne(id_departamento);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dataDto: UpdateDepartamentoDto) {
    if(isNaN(Number(id))) throw new NotFoundException("El id del departamento debe ser un número.")
    let id_departamento: number = parseFloat(id);
    if(!Number.isInteger(id_departamento)) throw new NotFoundException("El id del departamento debe ser un número entero.")
    return this.departamentosService.update(id_departamento, dataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if(isNaN(Number(id))) throw new NotFoundException("El id del departamento debe ser un número.")
    let id_departamento: number = parseFloat(id);
    if(!Number.isInteger(id_departamento)) throw new NotFoundException("El id del departamento debe ser un número entero.")
    return this.departamentosService.remove(id_departamento);
  }
}
