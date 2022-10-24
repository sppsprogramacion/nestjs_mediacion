import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sexo } from '../../sexo/entities/sexo.entity';
import { Provincia } from '../../provincias/entities/provincia.entity';
import { Departamento } from '../../departamentos/entities/departamento.entity';
import { Municipio } from '../../municipios/entities/municipio.entity';
import { Categoria } from '../../categorias/entities/categoria.entity';

@Entity('vinculados')
export class Vinculdado {
    @PrimaryGeneratedColumn()
    id_vinculado: number;

    //TRAMITE
    @Column({
        type: 'int',
        nullable: false
    })
    tramite_id: number;

    //FIN TRAMITE

    @Column({
        type:'varchar',
        length: 100,
        nullable: false
    })
    apellido: string;   

    @Column({
        type:'varchar',
        length: 100,
        nullable: false
    })
    nombre: string;

     
    @Column({
        type: 'int',
        nullable: true
    })
    dni: number;

    //SEXO
    @Column({
        type: 'int',
        nullable: false
    })
    sexo_id: number;

    @ManyToOne(type => Sexo, {eager: true} )
    @JoinColumn({
        name: 'sexo_id',
        referencedColumnName: 'id_sexo'
    })
    sexo: Sexo;
    //FIN SEXO

    //PROVINCIA
    @Column({
        type: 'int',
        nullable: false
    })
    provincia_id: number;

    @ManyToOne(type => Provincia, {eager: true} )
    @JoinColumn({
        name: 'provincia_id',
        referencedColumnName: 'id_provincia'
    })
    provincia: Provincia;
    //FIN PROVINCIA

    //DEPARTAMENTO
    @Column({
        type: 'int',
        nullable: false
    })
    departamento_id: number;

    @ManyToOne(type => Departamento, {eager: true})
    @JoinColumn({
        name: 'departamento_id',
        referencedColumnName: 'id_departamento'
    })
    departamento: Departamento;
    //FIN DEPARATMENTO

    //MUNICIPIO
    @Column({
        type: 'int',
        nullable: false
    })
    municipio_id: number

    @ManyToOne(type => Municipio, {eager:true})
    @JoinColumn({
        name: 'municipio_id',
        referencedColumnName: 'id_municipio'
    })
    municipio: Municipio;
    //FIN MUNICIPIO

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    localidad_barrio: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    calle: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true
    })
    departamento_dom: string

    @Column({
        type: 'varchar',
        length: 10,
        nullable: true
    })
    piso: string;

    @Column({
        type: 'int',
        nullable: false
    })
    numero_dom: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    punto_referencia: string;    

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    telefono: string;    

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true,
        unique: true
    })
    email:string;

    //CATEGORIA
    @Column({
        type: 'int',
        nullable: false
    })
    categoria_id: number

    @ManyToOne(type => Categoria, {eager:true})
    @JoinColumn({
        name: 'categoria_id',
        referencedColumnName: 'id_categoria'
    })
    categoria: Categoria;
    //FIN CATEGORIA

    @Column({
        type: "boolean",
        default: true
    })
    vigente: boolean;
}
