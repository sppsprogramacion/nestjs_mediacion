import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(data: CreateDepartamentoDto): Promise<Departamento> {
    const existe = await this.departamentoRepository.findOneBy({departamento: data.departamento});
    if(existe) throw new BadRequestException ("El departamento que intenta crear ya existe.");
    const nuevo = await this.departamentoRepository.create(data);
    return await this.departamentoRepository.save(nuevo);
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

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.departamentoRepository.findOneBy({id_departamento: id});
    if (!respuesta) throw new NotFoundException("No se encontró el registro de departamento solicitado.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateDepartamentoDto) {
    const respuesta = await this.departamentoRepository.update(id, data);
    if((respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de departamento.");
    return respuesta;
  }

  async remove(id: number) {
    const respuesta = await this.departamentoRepository.findOneBy({id_departamento: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de departamento que intenta eliminar");
    return await this.departamentoRepository.remove(respuesta);
  }
}

