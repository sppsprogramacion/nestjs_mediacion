import { Injectable } from '@nestjs/common';
import { CreateSexoDto } from './dto/create-sexo.dto';
import { UpdateSexoDto } from './dto/update-sexo.dto';

@Injectable()
export class SexoService {
  create(createSexoDto: CreateSexoDto) {
    return 'This action adds a new sexo';
  }

  findAll() {
    return `This action returns all sexo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sexo`;
  }

  update(id: number, updateSexoDto: UpdateSexoDto) {
    return `This action updates a #${id} sexo`;
  }

  remove(id: number) {
    return `This action removes a #${id} sexo`;
  }
}
