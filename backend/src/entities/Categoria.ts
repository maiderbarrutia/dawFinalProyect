import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('Categoria')
@Unique(['nombre_categoria'])
export class Categoria {
  @PrimaryGeneratedColumn({ name: 'id_categoria' })
  id_categoria!: number;

  @Column({ name: 'nombre_categoria', type: 'varchar', length: 100, nullable: false })
  nombre_categoria!: string;

  @Column({ name: 'descripcion_categoria', type: 'text', nullable: true })
  descripcion_categoria!: string;

  @Column({ name: 'imagen_categoria', type: 'varchar', length: 255, nullable: true })
  imagen_categoria!: string;
}