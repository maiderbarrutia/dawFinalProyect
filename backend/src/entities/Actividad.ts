import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Empresa } from "./Empresa";
import { Categoria } from "./Categoria";
import { Inscripcion } from "./Inscripcion";

@Entity()
export class Actividad {
  @PrimaryGeneratedColumn()
  id_actividad!: number;

  @Column()
  titulo_actividad!: string;

  @Column("text")
  descripcion_actividad!: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.actividades, { onDelete: "CASCADE" })
  empresa!: Empresa;

  @ManyToOne(() => Categoria, (categoria) => categoria.actividades, { onDelete: "SET NULL" })
  categoria!: Categoria;

  @Column("date")
  fecha_actividad!: Date;

  @Column("time")
  hora_actividad!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  precio_actividad!: number;

  @Column()
  numero_plazas!: number;

  @Column()
  duracion_actividad!: number;

  @Column("enum", { enum: ["fácil", "medio", "difícil"] })
  nivel_dificultad!: "fácil" | "medio" | "difícil";

  @Column()
  tipo_actividad!: string;

  @Column("text")
  ubicacion_actividad!: string;

  @Column("json", { nullable: true })
  imagenes_actividad!: string[];

  @Column("json", { nullable: true })
  videos_actividad!: string[];

  @Column("text", { nullable: true })
  incluye!: string;

  @Column("text", { nullable: true })
  no_incluye!: string;

  @Column("boolean", { default: false })
  politica_privacidad!: boolean;

  @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.actividad)
  inscripciones!: Inscripcion[];
}
