import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';
import { Repository } from 'typeorm';
import { Provincia } from './entities/provincia.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProvinciasService {
  constructor(
    @InjectRepository(Provincia)
    private readonly provinciasRepository: Repository<Provincia>
  ){}

  async create(data: CreateProvinciaDto): Promise<Provincia> {
    const existe = await this.provinciasRepository.findOneBy({provincia: data.provincia});
    if(existe) throw new BadRequestException ("La provincia que intenta crear ya existe.");
    const nuevo = await this.provinciasRepository.create(data);
    return await this.provinciasRepository.save(nuevo);
  }

  async findAll() {
    return await this.provinciasRepository.findAndCount(
      {
          order:{
              provincia: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.provinciasRepository.findOneBy({id_provincia: id});
    if (!respuesta) throw new NotFoundException("No se encontró el registro de provincia solicitado.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateProvinciaDto) {
    const respuesta = await this.provinciasRepository.update(id, data);
    if((respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de provincia.");
    return respuesta;
  }

  async remove(id: number) {
    const respuesta = await this.provinciasRepository.findOneBy({id_provincia: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de provincia que intenta eliminar");
    return await this.provinciasRepository.remove(respuesta);
  }
}
