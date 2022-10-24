import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/update-municipio.dto';
import { Repository } from 'typeorm';
import { Municipio } from './entities/municipio.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MunicipiosService {

  constructor(
    @InjectRepository(Municipio)
    private readonly municipiosRepository: Repository<Municipio>
  ){}

  
  async create(data: CreateMunicipioDto): Promise<Municipio> {
    const nuevo = await this.municipiosRepository.create(data);
    return await this.municipiosRepository.save(nuevo);
  }

  async findAll() {
    return await this.municipiosRepository.findAndCount(
      {
          order:{
              municipio: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.municipiosRepository.findOneBy({id_municipio: id});
    if (!respuesta) throw new NotFoundException("No se encontró el registro de municipio solicitado.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateMunicipioDto) {
    const respuesta = await this.municipiosRepository.update(id, data);
    if((respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de municipio.");
    return respuesta;
  }

  async remove(id: number) {
    const respuesta = await this.municipiosRepository.findOneBy({id_municipio: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de municipio que intenta eliminar");
    return await this.municipiosRepository.remove(respuesta);
  }
}
