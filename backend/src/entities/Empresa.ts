import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Empresa')
export class Empresa {
  @PrimaryGeneratedColumn({ name: 'id_empresa' })
  id_empresa!: number;

  @Column({ name: 'nombre_empresa', type: 'varchar', length: 255, nullable: false })
  nombre_empresa!: string;

  @Column({ name: 'tipo_empresa', type: 'varchar', length: 100, nullable: true })
  tipo_empresa!: string;

  @Column({ name: 'logo_empresa', type: 'varchar', length: 255, nullable: true })
  logo_empresa!: string;

  @Column({ name: 'cif_empresa', type: 'varchar', length: 20, unique: true, nullable: true })
  cif_empresa!: string;

  @Column({ name: 'persona_contacto', type: 'varchar', length: 255, nullable: true })
  persona_contacto!: string;

  @Column({ name: 'telefono_empresa', type: 'varchar', length: 20, nullable: true })
  telefono_empresa!: string;

  @Column({ name: 'direccion_empresa', type: 'text', nullable: true })
  direccion_empresa!: string;

  @Column({ name: 'web_empresa', type: 'varchar', length: 255, nullable: true })
  web_empresa!: string;

  @Column({ name: 'email_empresa', type: 'varchar', length: 255, unique: true, nullable: true })
  email_empresa!: string;

  @Column({ name: 'contrasena_empresa', type: 'varchar', length: 255, nullable: false })
  contrasena_empresa!: string;

  @Column({ name: 'fecha_registro', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro!: Date;
}