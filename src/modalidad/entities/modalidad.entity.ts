import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('modalidad')
export class Modalidad {

    @PrimaryGeneratedColumn()
    id_modalidad: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    modalidad: string
}
