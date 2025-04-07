import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('UserData')
export class UserData {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  user_id!: number;

  @Column({ name: 'first_name', type: 'varchar', length: 100, nullable: false })
  first_name!: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100, nullable: true })
  last_name!: string;

  @Column({ name: 'user_email', type: 'varchar', length: 255, unique: true, nullable: false })
  user_email!: string;

  @Column({ name: 'user_phone', type: 'varchar', length: 20, nullable: true })
  user_phone!: string;

  @Column({ name: 'user_city', type: 'varchar', length: 255, nullable: true })
  user_city!: string;

  @Column({ name: 'user_password', type: 'varchar', length: 255, nullable: true })
  user_password!: string;

  @Column({ name: 'privacy_policy', type: 'boolean', default: false })
  privacy_policy!: boolean;

  @Column({ name: 'registration_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registration_date!: Date;
}
