import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AudienciasService } from './audiencias.service';
import { CreateAudienciaDto } from './dto/create-audiencia.dto';
import { UpdateAudienciaDto } from './dto/update-audiencia.dto';

@Controller('audiencias')
export class AudienciasController {
  constructor(private readonly audienciasService: AudienciasService) {}

  @Post()
  create(@Body() createAudienciaDto: CreateAudienciaDto) {
    return this.audienciasService.create(createAudienciaDto);
  }

  @Get()
  findAll() {
    return this.audienciasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audienciasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAudienciaDto: UpdateAudienciaDto) {
    return this.audienciasService.update(+id, updateAudienciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.audienciasService.remove(+id);
  }
}
