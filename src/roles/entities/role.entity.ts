import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('roles')
export class Rol {
    @PrimaryColumn({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    id_rol: string;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    rol: string
}
