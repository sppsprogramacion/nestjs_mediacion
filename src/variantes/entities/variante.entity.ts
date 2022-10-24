import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('variantes')
export class Variante {

    @PrimaryGeneratedColumn()
    id_variante: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    variante: string;
}
