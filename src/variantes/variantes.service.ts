import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

    const nuevo = await this.varianteRepository.create(data);
    try {

      return await this.varianteRepository.save(nuevo);
    }catch (error) {
      if(error.code == 'ER_DUP_ENTRY'){
        let existe = await this.varianteRepository.findOneBy({variante: data.variante});
        if(existe) throw new InternalServerErrorException ("La variante que intenta crear ya existe.");      
      } 

      throw new InternalServerErrorException('Error al crear la variante: ',error.message);  
    }
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

    try{
      const respuesta = await this.varianteRepository.update(id, data);
      if((await respuesta).affected == 0){
        await this.findOne(id);
        throw new InternalServerErrorException("No se modificó el registro.");
      } 
      return respuesta;
    }
    catch(error){
      if(error.code=='ER_DUP_ENTRY'){
        throw new InternalServerErrorException('La variante ingresada ya existe.');
      }      
      throw new InternalServerErrorException('Error al modificar la variante: ',error.message);
    } 
  }

  async remove(id: number) {
    const respuesta = await this.varianteRepository.findOneBy({id_variante: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de variante que intenta eliminar");
    return await this.varianteRepository.remove(respuesta);
  }
}
