import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ConvocadosService } from './convocados.service';
import { CreateConvocadoNoSaltaDto } from './dto/create-convocado-nosalta.dto';
import { CreateConvocadoSaltaDto } from './dto/create-convocado-salta.dto';
import { Convocado } from './entities/convocado.entity';
import { UpdateConvocadoDto } from './dto/update-convocado.dto';

@Controller('convocados')
export class ConvocadosController {
  constructor(
    private readonly convocadosService: ConvocadosService
  ) {}
 
  @Post('nuevo-convocado-salta')
  createConvocadoSalta(@Body() data: CreateConvocadoSaltaDto) {
    let convocado: Partial<Convocado> = data;

    return this.convocadosService.create(convocado);
  }

  @Post('nuevo-convocado-nosalta')
  createConvocadoNoSalta(@Body() data: CreateConvocadoNoSaltaDto) {
    let convocado: Partial<Convocado> = data;

    return this.convocadosService.create(convocado);
  }

  @Get('buscar-xdni')  
  async findConvocadoXDni(
    @Query('dni', ParseIntPipe) dni: string
  ) {    
    
    return this.convocadosService.findXDni(+dni);
  }

  @Get('buscar-xtramite')  
  async findConvocadoXTramite(
    @Query('num_tramite', ParseIntPipe) num_tramite: string
  ) {    
    
    return this.convocadosService.findXTramite(+num_tramite);
  }

  @Get()
  findAll() {
    return this.convocadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
        
    return this.convocadosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateConvocadoDto
  ) {
    
    return this.convocadosService.update(+id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {

    return this.convocadosService.remove(+id);
  }
}
