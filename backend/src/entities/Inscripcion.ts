import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Usuario } from './Usuario';
import { Actividad } from './Actividad';

@Entity('Inscripcion')
@Index(['usuario_id'])
@Index(['actividad_id'])
export class Inscripcion {
  @PrimaryGeneratedColumn({ name: 'id_inscripcion' })
  id_inscripcion!: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.id_usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Usuario;

  @Column({ name: 'usuario_id', type: 'int', nullable: false })
  usuario_id!: number;

  @ManyToOne(() => Actividad, (actividad) => actividad.id_actividad, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'actividad_id' })
  actividad!: Actividad;

  @Column({ name: 'actividad_id', type: 'int', nullable: false })
  actividad_id!: number;

  @Column({ name: 'fecha_inscripcion', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_inscripcion!: Date;
}
