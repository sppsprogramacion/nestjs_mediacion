import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVarianteDto } from './dto/create-variante.dto';
import { UpdateVarianteDto } from './dto/update-variante.dto';
import { Variante } from './entities/variante.entity';

@Injectable()
export class VariantesService {
  constructor(
    @InjectRepository(Variante)
    private readonly varianteRepository: Repository<Variante>
  ){}

  async create(data: CreateVarianteDto): Promise<Variante> {
    const existe = await this.varianteRepository.findOneBy({variante: data.variante});
    if(existe) throw new BadRequestException ("La variante que intenta crear ya existe.");
    const nuevo = await this.varianteRepository.create(data);
    return await this.varianteRepository.save(nuevo);
  }

  async findAll() {
    return await this.varianteRepository.findAndCount(
      {
          order:{
              variante: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.varianteRepository.findOneBy({id_variante: id});
    if (!respuesta) throw new NotFoundException("No se encontró el registro de variante solicitado.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateVarianteDto) {
    const respuesta = await this.varianteRepository.update(id, data);
    if((respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de variante.");
    return respuesta;
  }

  async remove(id: number) {
    const respuesta = await this.varianteRepository.findOneBy({id_variante: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de variante que intenta eliminar");
    return await this.varianteRepository.remove(respuesta);
  }
}
