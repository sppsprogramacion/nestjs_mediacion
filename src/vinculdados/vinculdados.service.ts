import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVinculdadoDto } from './dto/create-vinculdado.dto';
import { UpdateVinculdadoDto } from './dto/update-vinculdado.dto';
import { Vinculdado } from './entities/vinculdado.entity';

@Injectable()
export class VinculdadosService {
  constructor(
    @InjectRepository(Vinculdado)
    private readonly convocadosRepository: Repository<Vinculdado>
  ){}

  async create(data: CreateVinculdadoDto): Promise<Vinculdado> {
    const nuevo = await this.convocadosRepository.create(data);
    return await this.convocadosRepository.save(nuevo);
  }

  async findAll() {
    return await this.convocadosRepository.findAndCount(
      {
          order:{
              apellido: "ASC"
          }
      }
    );
  }

  //BUSCAR  XDni
  async findXDni(dnix: number) {

    const respuesta = await this.convocadosRepository.findOneBy({dni: dnix});
    if (!respuesta) throw new NotFoundException("No se encontró el registro del vinculado solicitado.");
    return respuesta;
  }
  //FIN BUSCAR  XDni..................................................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.convocadosRepository.findOneBy({id_vinculado: id});
    if (!respuesta) throw new NotFoundException("No se encontró el registro del vinculado solicitado.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateVinculdadoDto) {
    try{
      const respuesta = await this.convocadosRepository.update({id_vinculado: id}, data);
      if((respuesta).affected == 0) throw new NotFoundException("No se modificó el registro del vinculado.");
      return respuesta;
    }
    catch(error){
      throw new NotFoundException('Error al modificar el vinculado: ',error.message);
    }
  }

  async remove(id: number) {
    const respuesta = await this.convocadosRepository.findOneBy({id_vinculado: id});
    if(!respuesta) throw new NotFoundException("No existe el registro del vinculado que intenta eliminar");
    return await this.convocadosRepository.remove(respuesta);
  }
}
