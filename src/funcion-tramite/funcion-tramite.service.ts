import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFuncionTramiteDto } from './dto/create-funcion-tramite.dto';
import { UpdateFuncionTramiteDto } from './dto/update-funcion-tramite.dto';
import { FuncionTramite } from './entities/funcion-tramite.entity';

@Injectable()
export class FuncionTramiteService {
  constructor(
    @InjectRepository(FuncionTramite)
    private readonly funcionTramiteRepository: Repository<FuncionTramite>
  ){}

  async create(data: CreateFuncionTramiteDto): Promise<FuncionTramite> {
    const existe = await this.funcionTramiteRepository.findOneBy({funcion_tramite: data.funcion_tramite});
    if(existe) throw new BadRequestException ("La funcion en tramite que intenta crear ya existe.");
    const nuevo = await this.funcionTramiteRepository.create(data);
    return await this.funcionTramiteRepository.save(nuevo);
  }

  async findAll() {
    return await this.funcionTramiteRepository.findAndCount(
      {
          order:{
              funcion_tramite: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.funcionTramiteRepository.findOneBy({id_funcion_tramite: id});
    if (!respuesta) throw new NotFoundException("No se encontró el registro de funcion en tramite solicitado.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateFuncionTramiteDto) {
    const respuesta = await this.funcionTramiteRepository.update(id, data);
    if((respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de funcion entramite.");
    return respuesta;
  }

  async remove(id: number) {
    const respuesta = await this.funcionTramiteRepository.findOneBy({id_funcion_tramite: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de funcion en tramite que intenta eliminar");
    return await this.funcionTramiteRepository.remove(respuesta);
  }
}
