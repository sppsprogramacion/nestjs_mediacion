import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSexoDto } from './dto/create-sexo.dto';
import { UpdateSexoDto } from './dto/update-sexo.dto';
import { Repository } from 'typeorm';
import { Sexo } from './entities/sexo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SexoService {
  constructor(
    @InjectRepository(Sexo)
    private readonly sexoRepository: Repository<Sexo>
  ){}

  async create(data: CreateSexoDto): Promise<Sexo> {
    const existe = await this.sexoRepository.findOneBy({sexo: data.sexo});
    if(existe) throw new BadRequestException ("El sexo que intenta crear ya existe.");
    const nuevo = await this.sexoRepository.create(data);
    return await this.sexoRepository.save(nuevo);
  }

  async findAll() {
    return await this.sexoRepository.findAndCount(
      {
          order:{
              sexo: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.sexoRepository.findOneBy({id_sexo: id});
    if (!respuesta) throw new NotFoundException("No se encontró el registro de sexo solicitado.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateSexoDto) {
    const respuesta = await this.sexoRepository.update(id, data);
    if((respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de sexo.");
    return respuesta;
  }

  async remove(id: number) {
    const respuesta = await this.sexoRepository.findOneBy({id_sexo: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de sexo que intenta eliminar");
    return await this.sexoRepository.remove(respuesta);
  }
}
