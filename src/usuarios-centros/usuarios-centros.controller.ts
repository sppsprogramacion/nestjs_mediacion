import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosCentrosService } from './usuarios-centros.service';
import { CreateUsuarioCentroDto } from './dto/create-usuario-centro.dto';
import { UpdateUsuarioCentroDto } from './dto/update-usuario-centro.dto';

@Controller('usuarios-centros')
export class UsuariosCentrosController {
  constructor(private readonly usuariosCentrosService: UsuariosCentrosService) {}

  @Post()
  create(@Body() createUsuariosCentroDto: CreateUsuarioCentroDto) {
    return this.usuariosCentrosService.create(createUsuariosCentroDto);
  }

  @Get()
  findAll() {
    return this.usuariosCentrosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosCentrosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuariosCentroDto: UpdateUsuarioCentroDto) {
    return this.usuariosCentrosService.update(+id, updateUsuariosCentroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosCentrosService.remove(+id);
  }
}
