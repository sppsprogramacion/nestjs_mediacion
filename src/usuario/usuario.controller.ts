import { Controller, Get, Post, Body, Param, Delete, Req, NotFoundException, Put } from '@nestjs/common';
import { Request } from 'express';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() data: CreateUsuarioDto) {
    return this.usuarioService.create(data);
  }

  @Get('buscar-xdni')  
  async findCiudadanoXDni(
    @Req()
    req: Request
  ) {
    
    if(!req.query.dni) throw new NotFoundException("El dni no fue ingresado.")
    if(isNaN(Number(req.query.dni.toString()))) throw new NotFoundException("El dni debe ser un número.")
    let dnix: number = parseFloat(req.query.dni.toString());
    if(!Number.isInteger(dnix)) throw new NotFoundException("El dni debe ser un número entero.")
    return this.usuarioService.findXDni(dnix);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
    
  //   if(isNaN(Number(id))) throw new NotFoundException("El id del ciudadano debe ser un número.")
  //   let id_ciudadano: number = parseFloat(id);
  //   if(!Number.isInteger(id_ciudadano)) throw new NotFoundException("El id del ciudadano debe ser un número entero.")
  //   return this.ciudadanosService.findOne(id_ciudadano);
  // }



  @Put(':dni')
  update(@Param('dni') dni: string, @Body() dataDto: UpdateUsuarioDto) {
    if(isNaN(Number(dni))) throw new NotFoundException("El dni debe ser un número.")
    let dnix: number = parseFloat(dni);
    if(!Number.isInteger(dnix)) throw new NotFoundException("El dni debe ser un número entero.")
    return this.usuarioService.update(dnix, dataDto);
  }

  @Delete(':dni')
  remove(@Param('dni') dni: string) {
    if(isNaN(Number(dni))) throw new NotFoundException("El dni debe ser un número.")
    let dnix: number = parseFloat(dni);
    if(!Number.isInteger(dnix)) throw new NotFoundException("El dni debe ser un número entero.")
    return this.usuarioService.remove(dnix);
  }
}
