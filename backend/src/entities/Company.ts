import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Company')
export class Company {
  @PrimaryGeneratedColumn({ name: 'company_id' })
  company_id!: number;

  @Column({ name: 'company_name', type: 'varchar', length: 255, nullable: false })
  company_name!: string;

  @Column({ name: 'company_type', type: 'varchar', length: 100, nullable: true })
  company_type!: string;

  @Column({ name: 'company_logo', type: 'varchar', length: 255, nullable: true })
  company_logo!: string;

  @Column({ name: 'company_cif', type: 'varchar', length: 20, unique: true, nullable: true })
  company_cif!: string;

  @Column({ name: 'contact_person', type: 'varchar', length: 255, nullable: true })
  contact_person!: string;

  @Column({ name: 'company_phone', type: 'varchar', length: 20, nullable: true })
  company_phone!: string;

  @Column({ name: 'company_address', type: 'text', nullable: true })
  company_address!: string;

  @Column({ name: 'company_website', type: 'varchar', length: 255, nullable: true })
  company_website!: string;

  @Column({ name: 'company_email', type: 'varchar', length: 255, unique: true, nullable: true })
  company_email!: string;

  @Column({ name: 'company_password', type: 'varchar', length: 255, nullable: false })
  company_password!: string;

  @Column({ name: 'privacy_policy', type: 'boolean', default: false })
  privacy_policy!: boolean; 

  @Column({ name: 'registration_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registration_date!: Date;
}