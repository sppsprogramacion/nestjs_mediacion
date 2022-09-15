import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Departamento } from './entities/departamento.entity';

@Injectable()
export class DepartamentosService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>
  ){}

  async create(data: CreateDepartamentoDto) {

    //const exite= await this.departamentoRepository.findOne({departamento: data.departamento});
    return 'This action adds a new departamento';
  }

  async findAll() {
    return await this.departamentoRepository.findAndCount(
      {
          order:{
              departamento: "ASC"
          }
      }
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} departamento`;
  }

  async update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
    const respuesta = await this.departamentoRepository.update(id, updateDepartamentoDto);
    if((await respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de departamento.");
    return respuesta;
  }

  remove(id: number) {
    return `This action removes a #${id} departamento`;
  }
}
