import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('funcion_tramite')
export class FuncionTramite {

    @PrimaryGeneratedColumn()
    id_funcion_tramite: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    funcion_tramite: string
}
