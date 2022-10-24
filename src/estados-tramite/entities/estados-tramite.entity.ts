import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('estados_tramite')
export class EstadoTramite {
    @PrimaryGeneratedColumn()
    id_estado_tramite: number;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
        unique: true
    })
    estado_tramite: string
}
