import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    
    if(isNaN(Number(id))) throw new NotFoundException("El id del tipo de audiencia debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id del tipo de audiencia debe ser un número entero.")
    return this.tiposAudienciaService.findOne(idx);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dataDto: UpdateTipoAudienciaDto) {
    if(isNaN(Number(id))) throw new NotFoundException("El id de tipo de audiencia debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id del tipo de audiencia debe ser un número entero.")
    return this.tiposAudienciaService.update(idx, dataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if(isNaN(Number(id))) throw new NotFoundException("El id del tipo de audiencia debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id del tipo de audiencia debe ser un número entero.")
    return this.tiposAudienciaService.remove(idx);
  }
}
