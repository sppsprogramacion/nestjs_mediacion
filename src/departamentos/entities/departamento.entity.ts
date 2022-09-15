import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Provincia } from '../../provincias/entities/provincia.entity';

@Entity('departamentos')
export class Departamento {
    
    @PrimaryGeneratedColumn()
    id_departamento: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    departamento: string;

    //PROVINCIA
    @Column({
        type: "int",
        nullable:false
    })
    provincia_id: number;

    @ManyToOne(type => Provincia,{eager : true})
    @JoinColumn({
        name : 'provincia_id',
        referencedColumnName : 'id_provincia'
    })
    provincia : Provincia;
    //FIN PROINCIA............................
}
