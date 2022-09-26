import { Injectable } from '@nestjs/common';
import { CreateUsuarioCentroDto } from './dto/create-usuario-centro.dto';
import { UpdateUsuarioCentroDto } from './dto/update-usuario-centro.dto';

@Injectable()
export class UsuariosCentrosService {
  create(createUsuariosCentroDto: CreateUsuarioCentroDto) {
    return 'This action adds a new usuariosCentro';
  }

  findAll() {
    return `This action returns all usuariosCentros`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuariosCentro`;
  }

  update(id: number, updateUsuariosCentroDto: UpdateUsuarioCentroDto) {
    return `This action updates a #${id} usuariosCentro`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuariosCentro`;
  }
}
