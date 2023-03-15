import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Departamento } from './entities/departamento.entity';

@Injectable()
export class DepartamentosService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>
  ){}

  async create(data: CreateDepartamentoDto): Promise<Departamento> {

    const nuevo = await this.departamentoRepository.create(data);
    try {
      return await this.departamentoRepository.save(nuevo);
    } catch (error) {
      if(error.code=='ER_DUP_ENTRY'){
        let existe = await this.departamentoRepository.findOneBy({departamento: data.departamento});
        if(existe) throw new InternalServerErrorException ("El departamento que intenta crear ya existe.");      
      } 

      throw new InternalServerErrorException('Error al crear el departamento: ',error.message);  
    }
    
  }

  async findAll() {
    return await this.departamentoRepository.findAndCount(
      {
          order:{
              departamento: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.departamentoRepository.findOneBy({id_departamento: id});
    if (!respuesta) throw new NotFoundException("No se encontró el registro de departamento solicitado.");
    return respuesta;

  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateDepartamentoDto) {
    try{
      const respuesta = await this.departamentoRepository.update(id, data);
      if((await respuesta).affected == 0){
        await this.findOne(id);
        throw new InternalServerErrorException("No se modificó el registro.");
      } 
      return respuesta;
    }
    catch(error){
      if(error.code=='ER_DUP_ENTRY'){
        throw new InternalServerErrorException('El departamento ingresado ya existe.');
      }      
      throw new InternalServerErrorException('Error al modificar el departamento: ',error.message);
    }
  }

  async remove(id: number) {
    const respuesta = await this.departamentoRepository.findOneBy({id_departamento: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de departamento que intenta eliminar");
    return await this.departamentoRepository.remove(respuesta);
  }
}

