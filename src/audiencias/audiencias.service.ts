import { Injectable } from '@nestjs/common';
import { CreateAudienciaDto } from './dto/create-audiencia.dto';
import { UpdateAudienciaDto } from './dto/update-audiencia.dto';

@Injectable()
export class AudienciasService {
  create(createAudienciaDto: CreateAudienciaDto) {
    return 'This action adds a new audiencia';
  }

  findAll() {
    return `This action returns all audiencias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} audiencia`;
  }

  update(id: number, updateAudienciaDto: UpdateAudienciaDto) {
    return `This action updates a #${id} audiencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} audiencia`;
  }
}
