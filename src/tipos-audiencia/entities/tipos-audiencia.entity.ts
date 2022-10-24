import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipos_audiencia')
export class TipoAudiencia {

    @PrimaryGeneratedColumn()
    id_tipo_audiencia: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    tipo_audiencia: string
}
