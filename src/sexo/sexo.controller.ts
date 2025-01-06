import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { SexoService } from './sexo.service';
import { CreateSexoDto } from './dto/create-sexo.dto';
import { UpdateSexoDto } from './dto/update-sexo.dto';
import { AuthGuard } from '@nestjs/passport';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('sexo')
export class SexoController {
  constructor(private readonly sexoService: SexoService) {}

  @Post()
  @UseGuards( AuthGuard() )
  create(@Body() data: CreateSexoDto) {
    return this.sexoService.create(data);
  }

  // @Get()
  // @UseGuards( AuthGuard() )
  // async findAll(
  //   @GetUser() user: Usuario
  // ) {
  //   //return this.sexoService.findAll();
  //   const sexos = await this.sexoService.findAll();
  //   return {
  //     sexos,
  //     user //usuario devuelto por el decorador @GetUser
  //   }
  // }

  @Get()
  findAll() {
    return this.sexoService.findAll();
  }

  @Get(':id')
  @UseGuards( AuthGuard() )
  findOne(@Param('id', ParseIntPipe) id: string) {
    
    return this.sexoService.findOne(+id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  @UseGuards( AuthGuard() )
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  @Patch(':id')
  @UseGuards( AuthGuard() )
  update(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateSexoDto
  ) {
    
    return this.sexoService.update(+id, dataDto);
  }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: string) {
   
  //   return this.sexoService.remove(+id);
  // }
}
