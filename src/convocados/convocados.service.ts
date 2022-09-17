import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConvocadoDto } from './dto/create-convocado.dto';
import { UpdateConvocadoDto } from './dto/update-convocado.dto';
import { Convocado } from './entities/convocado.entity';

@Injectable()
export class ConvocadosService {
  
  constructor(
    @InjectRepository(Convocado)
    private readonly convocadosRepository: Repository<Convocado>
  ){}

  async create(data: CreateConvocadoDto): Promise<Convocado> {
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
    if (!respuesta) throw new NotFoundException("No se encontró el registro de convocado solicitado.");
    return respuesta;
  }
  //FIN BUSCAR  XDni..................................................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.convocadosRepository.findOneBy({id_convocado: id});
    if (!respuesta) throw new NotFoundException("No se encontró el registro de convocado solicitado.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateConvocadoDto) {
    try{
      const respuesta = await this.convocadosRepository.update({id_convocado: id}, data);
      if((respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de convocado.");
      return respuesta;
    }
    catch(error){
      throw new NotFoundException('Error al modificar el convocado: ',error.message);
    }
  }

  async remove(id: number) {
    const respuesta = await this.convocadosRepository.findOneBy({id_convocado: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de convocado que intenta eliminar");
    return await this.convocadosRepository.remove(respuesta);
  }
}
