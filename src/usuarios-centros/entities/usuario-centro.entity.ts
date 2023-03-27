import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CentroMediacion } from '../../centros-mediacion/entities/centro-mediacion.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('usuarios_centros')
export class UsuarioCentro {

    @PrimaryGeneratedColumn()
    id_usuario_centro: number;

    //CENTRO MEDIACION
    @Column({
        type: 'int',
        nullable: false
    })
    centro_mediacion_id: number;

    @ManyToOne(type => CentroMediacion, {eager: true})
    @JoinColumn({
        name: 'centro_mediacion_id',
        referencedColumnName: 'id_centro_mediacion'
    })
    centro_mediacion: CentroMediacion;
    //FIN CENTRO MEDIACION

    //USUARIO
    @Column({
        type: 'int',
        nullable: false
    })
    usuario_id: number

    @ManyToOne(type => Usuario, {eager:true})
    @JoinColumn({
        name: 'usuario_id',
        referencedColumnName: 'id_usuario'
    })
    usuario: Usuario;
    //FIN USUARIO

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true,
    })
    detalles: string;

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_designacion: Date;

    @Column({
        type: "boolean",
        default: true
    })
    activo: boolean;

    
}
