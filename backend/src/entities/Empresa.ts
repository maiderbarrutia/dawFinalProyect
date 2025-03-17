import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Actividad } from "./Actividad";

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn()
  id_empresa!: number;

  @Column()
  nombre_empresa!: string;

  @Column()
  tipo_empresa!: string;

  @Column({ nullable: true })
  logo_empresa!: string;

  @Column()
  cif_empresa!: string;

  @Column({ nullable: true })
  persona_contacto!: string;

  @Column({ nullable: true })
  telefono_empresa!: string;

  @Column({ nullable: true })
  direccion_empresa!: string;

  @Column({ nullable: true })
  web_empresa!: string;

  @Column()
  email_empresa!: string;

  @Column()
  contrasena_empresa!: string;

  @OneToMany(() => Actividad, (actividad) => actividad.empresa)
  actividades!: Actividad[];
}
