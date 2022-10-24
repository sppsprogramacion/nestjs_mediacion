import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('objetos')
export class Objeto {

    @PrimaryGeneratedColumn()
    id_objeto: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    objeto: string
}
