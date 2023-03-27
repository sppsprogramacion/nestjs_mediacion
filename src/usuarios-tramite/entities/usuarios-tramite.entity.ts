import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tramite } from '../../tramites/entities/tramite.entity';
import { FuncionTramite } from '../../funcion-tramite/entities/funcion-tramite.entity';

@Entity('usuario_tramite')
export class UsuariosTramite {
    @PrimaryGeneratedColumn()
    id_usuario_tramite: number;

    //TRAMITE
    @Column({
        type: 'int',
        nullable: false
    })
    tramite_numero: number;

    @ManyToOne(type => Tramite, {eager: true})
    @JoinColumn({
        name: 'tramite_numero',
        referencedColumnName: 'numero_tramite'
    })
    tramite: Tramite;
    //FIN TRAMITE

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
    fecha_asignacion: Date;

    @Column({
        type: 'date',
        nullable: true
    })
    fecha_sece: Date;

    //FUNCION TRAMITE
    @Column({
        type: 'int',
        nullable: false
    })
    funcion_tramite_id: number

    @ManyToOne(type => FuncionTramite, {eager:true})
    @JoinColumn({
        name: 'funcion_tramite_id',
        referencedColumnName: 'id_funcion_tramite'
    })
    funcion_tramite: FuncionTramite;
    //FIN FUNCION TRAMITE

    @Column({
        type: "boolean",
        default: true
    })
    activo: boolean;
}
