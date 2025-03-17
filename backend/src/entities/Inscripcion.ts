import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Actividad } from "./Actividad";

@Entity()
export class Inscripcion {
  @PrimaryGeneratedColumn()
  id_inscripcion!: number;

  @ManyToOne(() => Actividad, (actividad) => actividad.inscripciones, { onDelete: "CASCADE" })
  actividad!: Actividad;

  @Column()
  nombre_cliente!: string;

  @Column()
  apellidos_cliente!: string;

  @Column()
  email_cliente!: string;

  @Column({ nullable: true })
  telefono_cliente!: string;

  @Column({ nullable: true })
  ciudad_cliente!: string;

  @Column("text", { nullable: true })
  mensaje_cliente!: string;

  @Column("boolean", { default: false })
  aceptacion_terminos!: boolean;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  fecha_inscripcion!: Date;
}
