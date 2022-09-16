import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConvocadosService } from './convocados.service';
import { CreateConvocadoDto } from './dto/create-convocado.dto';
import { UpdateConvocadoDto } from './dto/update-convocado.dto';

@Controller('convocados')
export class ConvocadosController {
  constructor(private readonly convocadosService: ConvocadosService) {}

  @Post()
  create(@Body() createConvocadoDto: CreateConvocadoDto) {
    return this.convocadosService.create(createConvocadoDto);
  }

  @Get()
  findAll() {
    return this.convocadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.convocadosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConvocadoDto: UpdateConvocadoDto) {
    return this.convocadosService.update(+id, updateConvocadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.convocadosService.remove(+id);
  }
}
