import { type } from "os";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Provincia } from '../../provincias/entities/provincia.entity';
import { Departamento } from '../../departamentos/entities/departamento.entity';
import { Municipio } from '../../municipios/entities/municipio.entity';

@Entity('ciudadanos')
export class Ciudadano {
    
    @PrimaryColumn()
    dni: number;

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
    telefono: string;

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_nac: Date;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: false
    })
    correo:string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    clave: string;



}
