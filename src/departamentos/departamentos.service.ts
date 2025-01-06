import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Departamento } from './entities/departamento.entity';
import { CentroMediacion } from 'src/centros-mediacion/entities/centro-mediacion.entity';

@Injectable()
export class DepartamentosService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
    @InjectRepository(CentroMediacion)
    private readonly centrosMediacionRepository: Repository<CentroMediacion>,
  ){}

  async create(data: CreateDepartamentoDto): Promise<Departamento> {
    
    try {
      const nuevo = await this.departamentoRepository.create(data);
      return await this.departamentoRepository.save(nuevo);
    } catch (error) {

      this.handleDBErrors(error); 
    }
    
  }

  //BUSCAR  XDEPARTAMENTOS CON CENTRO MEDIACION
  async findConCentroMediacion() {

    const respuesta = await this.departamentoRepository.find(
      {
        
        where: {
          tiene_centro_mediacion: true
        }
      }
    );
    if (!respuesta) throw new NotFoundException("No se encontraron registros.");
    return respuesta;
    
    
  }
  //FIN BUSCAR XDEPARTAMENTOS CON CENTRO MEDIACION..................................................................

  async findAll() {
    return await this.departamentoRepository.findAndCount(
      {
          order:{
              departamento: "ASC"
          }
      }
    );
  }

  //RETORNAR DEPARTAMENTOS ACTUALIZADOS
  async findActualizarConCentroMediacion() {
    let dataDepartamento: UpdateDepartamentoDto = new UpdateDepartamentoDto;
    const respuestaDepartamentos = await this.departamentoRepository.find();

    if (respuestaDepartamentos){
      for (const departamento of respuestaDepartamentos) {
        //verificar si hay centros de mediacion activos para el departamento
        const cant_centros = await this.centrosMediacionRepository.createQueryBuilder('centros_mediacion')
          .select('count(centros_mediacion.id_centro_mediacion)','cantidad')
          .where('centros_mediacion.departamento_id = :id_departamento', { id_departamento: departamento.id_departamento })
          .andWhere('centros_mediacion.activo= :activa', {activa: true})
          .getRawOne();
        
          if(cant_centros.cantidad > 0){
            dataDepartamento.tiene_centro_mediacion = true;
          } 
          if(cant_centros.cantidad == 0){
            dataDepartamento.tiene_centro_mediacion = false;
          }   
        
          try{

            const respuesta = await this.departamentoRepository.update(departamento.id_departamento,dataDepartamento);
          }
          catch (error){
            this.handleDBErrors(error);
          }
      }
    }

    return this.findAll();
    
  }
  //FIN RETORNAR DEPARTAMENETOS ACTUALIZADOS........................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.departamentoRepository.findOneBy({id_departamento: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe");
    return respuesta;

  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateDepartamentoDto) {
    try{
      const respuesta = await this.departamentoRepository.update(id, data);
      if((await respuesta).affected == 0){
        await this.findOne(id);
      } 

      return respuesta;
    }
    catch(error){
      this.handleDBErrors(error);
    }
  }

  async remove(id: number) {
    const respuesta = await this.departamentoRepository.findOneBy({id_departamento: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de departamento que intenta eliminar");
    return await this.departamentoRepository.remove(respuesta);
  }


  //MANEJO DE ERRORES
  private handleDBErrors(error: any): never {
    if(error.code === "ER_DUP_ENTRY"){
      throw new BadRequestException (error.sqlMessage);
    }
    
    if(error.status == 404) throw new NotFoundException(error.response);

    throw new InternalServerErrorException (error.message);
  }
  //FIN MANEJO DE ERRORES........................................
}

