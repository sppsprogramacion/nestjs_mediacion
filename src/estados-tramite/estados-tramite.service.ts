import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstadoTramiteDto } from './dto/create-estado-tramite.dto';
import { UpdateEstadoTramiteDto } from './dto/update-estado-tramite.dto';
import { EstadoTramite } from './entities/estados-tramite.entity';

@Injectable()
export class EstadosTramiteService {
  constructor(
    @InjectRepository(EstadoTramite)
    private readonly estadoTramiteRepository: Repository<EstadoTramite>
  ){}

  async create(data: CreateEstadoTramiteDto): Promise<EstadoTramite> {
    const existe = await this.estadoTramiteRepository.findOneBy({estado_tramite: data.estado_tramite});
    if(existe) throw new BadRequestException ("El estado de tramite que intenta crear ya existe.");
    const nuevo = await this.estadoTramiteRepository.create(data);
    return await this.estadoTramiteRepository.save(nuevo);
  }

  async findAll() {
    return await this.estadoTramiteRepository.findAndCount(
      {
          order:{
              estado_tramite: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {
    const respuesta = await this.estadoTramiteRepository.findOneBy({id_estado_tramite: id});
    if (!respuesta) throw new NotFoundException("No se encontró el registro de estado de tramite solicitado.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateEstadoTramiteDto) {
    const respuesta = await this.estadoTramiteRepository.update(id, data);
    if((respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de estado de tramite.");
    return respuesta;
  }

  async remove(id: number) {
    const respuesta = await this.estadoTramiteRepository.findOneBy({id_estado_tramite: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de estado de tramite que intenta eliminar");
    return await this.estadoTramiteRepository.remove(respuesta);
  }
}
