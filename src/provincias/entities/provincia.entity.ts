import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('provincias')
export class Provincia {

    @PrimaryGeneratedColumn()
    id_provincia: number;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    provincia: string;
}
