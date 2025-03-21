import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Empresa } from './Empresa';
import { Categoria } from './Categoria';

@Entity('Actividad')
@Index(['categoria_id'])
@Index(['fecha_actividad'])
export class Actividad {
  @PrimaryGeneratedColumn({ name: 'id_actividad' })
  id_actividad!: number;

  @Column({ name: 'titulo_actividad', type: 'varchar', length: 255, nullable: false })
  titulo_actividad!: string;

  @Column({ name: 'descripcion_actividad', type: 'text', nullable: true })
  descripcion_actividad!: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.id_empresa, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'empresa_id' })
  empresa!: Empresa;

  @Column({ name: 'empresa_id', type: 'int', nullable: false })
  empresa_id!: number;

  @Column({ name: 'fecha_actividad', type: 'date', nullable: true })
  fecha_actividad!: Date;

  @Column({ name: 'hora_actividad', type: 'time', nullable: true })
  hora_actividad!: string;

  @Column({ name: 'precio_actividad', type: 'decimal', precision: 10, scale: 2, nullable: true })
  precio_actividad!: number;

  @Column({ name: 'numero_plazas', type: 'int', nullable: true })
  numero_plazas!: number;

  @Column({ name: 'duracion_actividad', type: 'int', nullable: true })
  duracion_actividad!: number;

  @Column({ name: 'nivel_dificultad', type: 'enum', enum: ['fácil', 'medio', 'difícil'], nullable: true })
  nivel_dificultad!: string;

  @Column({ name: 'tipo_actividad', type: 'varchar', length: 100, nullable: true })
  tipo_actividad!: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.id_categoria, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'categoria_id' })
  categoria!: Categoria;

  @Column({ name: 'categoria_id', type: 'int', nullable: true })
  categoria_id!: number;

  @Column({ name: 'ubicacion_actividad', type: 'text', nullable: true })
  ubicacion_actividad!: string;

  @Column({ name: 'imagenes_actividad', type: 'json', nullable: true })
  imagenes_actividad!: string;

  @Column({ name: 'videos_actividad', type: 'json', nullable: true })
  videos_actividad!: string;

  @Column({ name: 'incluye', type: 'text', nullable: true })
  incluye!: string;

  @Column({ name: 'no_incluye', type: 'text', nullable: true })
  no_incluye!: string;

  @Column({ name: 'politica_privacidad', type: 'boolean', default: false })
  politica_privacidad!: boolean;
}