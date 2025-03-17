import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Actividad } from "./Actividad";

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id_categoria!: number;

  @Column({ unique: true })
  nombre_categoria!: string;

  @Column("text")
  descripcion_categoria!: string;

  @Column({ nullable: true })
  imagen_categoria!: string;

  @OneToMany(() => Actividad, (actividad) => actividad.categoria)
  actividades!: Actividad[];
}

