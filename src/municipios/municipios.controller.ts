import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { MunicipiosService } from './municipios.service';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/update-municipio.dto';

@Controller('municipios')
export class MunicipiosController {
  constructor(private readonly municipiosService: MunicipiosService) {}

  @Post()
  create(@Body() data: CreateMunicipioDto) {
    return this.municipiosService.create(data);
  }

  @Get()
  findAll() {
    return this.municipiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
    if(isNaN(Number(id))) throw new NotFoundException("El id del municipio debe ser un número.")
    let id_municipio: number = parseFloat(id);
    if(!Number.isInteger(id_municipio)) throw new NotFoundException("El id del municipio debe ser un número entero.")
    return this.municipiosService.findOne(id_municipio);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dataDto: UpdateMunicipioDto) {
    if(isNaN(Number(id))) throw new NotFoundException("El id del municipio debe ser un número.")
    let id_municipio: number = parseFloat(id);
    if(!Number.isInteger(id_municipio)) throw new NotFoundException("El id del municipio debe ser un número entero.")
    return this.municipiosService.update(id_municipio, dataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if(isNaN(Number(id))) throw new NotFoundException("El id del municipio debe ser un número.")
    let id_municipio: number = parseFloat(id);
    if(!Number.isInteger(id_municipio)) throw new NotFoundException("El id del municipio debe ser un número entero.")
    return this.municipiosService.remove(id_municipio);
  }
}
