import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>
  ){}

  async create(data: CreateCategoriaDto): Promise<Categoria> {
    const existe = await this.categoriaRepository.findOneBy({categoria: data.categoria});
    if(existe) throw new BadRequestException ("La categoría que intenta crear ya existe.");
    const nuevo = await this.categoriaRepository.create(data);
    return await this.categoriaRepository.save(nuevo);
  }

  async findAll() {
    return await this.categoriaRepository.findAndCount(
      {
          order:{
              categoria: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.categoriaRepository.findOneBy({id_categoria: id});
    if (!respuesta) throw new NotFoundException("No se encontró el registro de categoría solicitado.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateCategoriaDto) {
    try{
      const respuesta = await this.categoriaRepository.update(id, data);
      if((respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de categoría.");
      return respuesta;
    }
    catch(error){
      if(error.code=='ER_DUP_ENTRY'){
        throw new NotFoundException('La categoría ingresada ya existe. Intente guardar nuevamente');
      }      
      throw new NotFoundException('Error al modificar la categoría: ',error.message);
    }
    
  }

  async remove(id: number) {
    const respuesta = await this.categoriaRepository.findOneBy({id_categoria: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de categoría que intenta eliminar");
    return await this.categoriaRepository.remove(respuesta);
  }
}
