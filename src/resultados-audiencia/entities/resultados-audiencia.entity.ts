import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('resultados_audiencia')
export class ResultadoAudiencia {

    @PrimaryGeneratedColumn()
    id_resultado_audiencia: number;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    resultado_audiencia: string;
}
