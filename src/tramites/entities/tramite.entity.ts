import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Objeto } from '../../objetos/entities/objeto.entity';
import { Modalidad } from '../../modalidad/entities/modalidad.entity';
import { Variante } from '../../variantes/entities/variante.entity';


@Entity('tramites')
export class Tramite {
    @PrimaryGeneratedColumn()
    id_tramite: number;

    @Column({
        type: "boolean",
        default: false
    })
    esta_asesorado: boolean;

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_tramite: Date;

    @Column({
        type: "boolean",
        default: false
    })
    es_expediente: boolean;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true,
        unique: false
    })
    expediente: string;

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_expediente: Date;

    //OBJETO
    @Column({
        type: "int",
        nullable:false
    })
    objeto_id: number;

    @ManyToOne(type => Objeto,{eager : true})
    @JoinColumn({
        name : 'objeto_id',
        referencedColumnName : 'id_objeto'
    })
    objeto : Objeto;
    //FIN OBJETO............................

    @Column({
        type: "boolean",
        default: false
    })
    violencia_genero: boolean;

    @Column({
        type: "boolean",
        default: false
    })
    violencia_partes: boolean;

    @Column({
        type: "boolean",
        default: false
    })
    existe_denuncia: boolean;

    @Column({
        type: "boolean",
        default: false
    })
    medida_cautelar: boolean;

    @Column({
        type: "boolean",
        default: false
    })
    pdf_denuncia: boolean;

    @Column({
        type: "boolean",
        default: false
    })
    pdf_cautelar: boolean;

    @Column({
        type: "boolean",
        default: false
    })
    pdf_ingresos: boolean;

    @Column({
        type: "boolean",
        default: false
    })
    pdf_negativa: boolean;

    //MODALIDAD
    @Column({
        type: "int",
        nullable:false
    })
    modalidad_id: number;

    @ManyToOne(type => Modalidad,{eager : true})
    @JoinColumn({
        name : 'modalidad_id',
        referencedColumnName : 'id_modalidad'
    })
    modalidad : Modalidad;
    //FIN MODALIDAD............................

    //VARIANTE
    @Column({
        type: "int",
        nullable:false
    })
    variante_id: number;

    @ManyToOne(type => Variante,{eager : true})
    @JoinColumn({
        name : 'variante_id',
        referencedColumnName : 'id_variante'
    })
    variante : Variante;
    //FIN VARIANTE............................
    

}
