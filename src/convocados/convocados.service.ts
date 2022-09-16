import { Injectable } from '@nestjs/common';
import { CreateConvocadoDto } from './dto/create-convocado.dto';
import { UpdateConvocadoDto } from './dto/update-convocado.dto';

@Injectable()
export class ConvocadosService {
  create(createConvocadoDto: CreateConvocadoDto) {
    return 'This action adds a new convocado';
  }

  findAll() {
    return `This action returns all convocados`;
  }

  findOne(id: number) {
    return `This action returns a #${id} convocado`;
  }

  update(id: number, updateConvocadoDto: UpdateConvocadoDto) {
    return `This action updates a #${id} convocado`;
  }

  remove(id: number) {
    return `This action removes a #${id} convocado`;
  }
}
