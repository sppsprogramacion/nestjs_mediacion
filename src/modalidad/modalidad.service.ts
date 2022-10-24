import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModalidadDto } from './dto/create-modalidad.dto';
import { UpdateModalidadDto } from './dto/update-modalidad.dto';
import { Modalidad } from './entities/modalidad.entity';

@Injectable()
export class ModalidadService {
  constructor(
    @InjectRepository(Modalidad)
    private readonly modalidadRepository: Repository<Modalidad>
  ){}

  async create(data: CreateModalidadDto): Promise<Modalidad> {
    const existe = await this.modalidadRepository.findOneBy({modalidad: data.modalidad});
    if(existe) throw new BadRequestException ("La modalidad que intenta crear ya existe.");
    const nuevo = await this.modalidadRepository.create(data);
    return await this.modalidadRepository.save(nuevo);
  }

  async findAll() {
    return await this.modalidadRepository.findAndCount(
      {
          order:{
              modalidad: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.modalidadRepository.findOneBy({id_modalidad: id});
    if (!respuesta) throw new NotFoundException("No se encontró el registro de modalidad solicitado.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateModalidadDto) {
    const respuesta = await this.modalidadRepository.update(id, data);
    if((respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de modalidad.");
    return respuesta;
  }

  async remove(id: number) {
    const respuesta = await this.modalidadRepository.findOneBy({id_modalidad: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de modalidad que intenta eliminar");
    return await this.modalidadRepository.remove(respuesta);
  }
}
