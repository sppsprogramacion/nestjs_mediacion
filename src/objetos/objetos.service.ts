import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateObjetoDto } from './dto/create-objeto.dto';
import { UpdateObjetoDto } from './dto/update-objeto.dto';
import { Objeto } from './entities/objeto.entity';

@Injectable()
export class ObjetosService {
  constructor(
    @InjectRepository(Objeto)
    private readonly objetoRepository: Repository<Objeto>
  ){}

  async create(data: CreateObjetoDto): Promise<Objeto> {
    const existe = await this.objetoRepository.findOneBy({objeto: data.objeto});
    if(existe) throw new BadRequestException ("El objeto que intenta crear ya existe.");
    const nuevo = await this.objetoRepository.create(data);
    return await this.objetoRepository.save(nuevo);
  }

  async findAll() {
    return await this.objetoRepository.findAndCount(
      {
          order:{
              objeto: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.objetoRepository.findOneBy({id_objeto: id});
    if (!respuesta) throw new NotFoundException("No se encontró el registro de objeto solicitado.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateObjetoDto) {
    const respuesta = await this.objetoRepository.update(id, data);
    if((respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de objeto.");
    return respuesta;
  }

  async remove(id: number) {
    const respuesta = await this.objetoRepository.findOneBy({id_objeto: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de objeto que intenta eliminar");
    return await this.objetoRepository.remove(respuesta);
  }
}
