import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Usuario')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id_usuario!: number;

  @Column({ name: 'nombre_usuario', type: 'varchar', length: 100, nullable: false })
  nombre_usuario!: string;

  @Column({ name: 'apellidos_usuario', type: 'varchar', length: 100, nullable: true })
  apellidos_usuario!: string;

  @Column({ name: 'email_usuario', type: 'varchar', length: 255, unique: true, nullable: false })
  email_usuario!: string;

  @Column({ name: 'telefono_usuario', type: 'varchar', length: 20, nullable: true })
  telefono_usuario!: string;

  @Column({ name: 'ciudad_usuario', type: 'varchar', length: 255, nullable: true })
  ciudad_usuario!: string;

  @Column({ name: 'contrasena_usuario', type: 'varchar', length: 255, nullable: true })
  contrasena_usuario!: string;

  @Column({ name: 'fecha_registro', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro!: Date;
}
