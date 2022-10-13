import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoAudienciaDto } from './dto/create-tipo-audiencia.dto';
import { UpdateTipoAudienciaDto } from './dto/update-tipo-audiencia.dto';
import { TipoAudiencia } from './entities/tipos-audiencia.entity';

@Injectable()
export class TiposAudienciaService {
  constructor(
    @InjectRepository(TipoAudiencia)
    private readonly tipoAudienciaRepository: Repository<TipoAudiencia>
  ){}

  async create(data: CreateTipoAudienciaDto): Promise<TipoAudiencia> {
    const existe = await this.tipoAudienciaRepository.findOneBy({tipo_audiencia: data.tipo_audiencia});
    if(existe) throw new BadRequestException ("El tipo de audiencia que intenta crear ya existe.");
    const nuevo = await this.tipoAudienciaRepository.create(data);
    return await this.tipoAudienciaRepository.save(nuevo);
  }

  async findAll() {
    return await this.tipoAudienciaRepository.findAndCount(
      {
          order:{
              tipo_audiencia: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.tipoAudienciaRepository.findOneBy({id_tipo_audiencia: id});
    if (!respuesta) throw new NotFoundException("No se encontró el registro de tipo de audiencia solicitado.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateTipoAudienciaDto) {
    const respuesta = await this.tipoAudienciaRepository.update(id, data);
    if((respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de tipo de audiencia.");
    return respuesta;
  }

  async remove(id: number) {
    const respuesta = await this.tipoAudienciaRepository.findOneBy({id_tipo_audiencia: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de tipo de audiencia que intenta eliminar");
    return await this.tipoAudienciaRepository.remove(respuesta);
  }
}
