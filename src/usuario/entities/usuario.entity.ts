import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import {hash} from 'bcryptjs';
import { Sexo } from "src/sexo/entities/sexo.entity";

@Entity('usuarios')
export class Usuario {
    
    @PrimaryColumn()
    dni: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: false
    })
    apellido: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: false
    })
    nombre: string;

    //SEXO
    @Column({
        type: 'int',
        nullable: true
    })
    sexo_id: number;

    @ManyToOne(type => Sexo, {eager: true} )
    @JoinColumn({
        name: 'sexo_id',
        referencedColumnName: 'id_sexo'
    })
    sexo: Sexo;
    //FIN SEXO

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: false
    })
    telefono: string;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: false,
        unique: false
    })
    email: string;

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_venc_licencia: Date;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: false,
        select: false
    })
    clave: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(!this.clave){
            return;
        }
        this.clave = await hash(this.clave,10);
    }
}


