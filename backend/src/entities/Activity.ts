import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Company } from './Company';
import { Category } from './Category';

@Entity('Activity')
@Index(['category_id'])
@Index(['activity_date'])
@Index(['company_id'])
export class Activity {
  @PrimaryGeneratedColumn({ name: 'activity_id' })
  activity_id!: number;

  @Column({ name: 'activity_title', type: 'varchar', length: 255, nullable: false })
  activity_title!: string;

  @Column({ name: 'activity_description', type: 'text', nullable: true })
  activity_description!: string;

  @ManyToOne(() => Company, (company) => company.company_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company!: Company;

  @Column({ name: 'company_id', type: 'int', nullable: false })
  company_id!: number;

  @Column({ name: 'activity_date', type: 'date', nullable: true })
  activity_date!: Date;

  @Column({ name: 'activity_time', type: 'time', nullable: true })
  activity_time!: string;

  @Column({ name: 'activity_price', type: 'decimal', precision: 10, scale: 2, nullable: true })
  activity_price!: number;

  @Column({ name: 'available_slots', type: 'int', nullable: true })
  available_slots!: number;

  @Column({ name: 'activity_duration', type: 'int', nullable: true })
  activity_duration!: number;

  @Column({ name: 'difficulty_level', type: 'enum', enum: ['easy', 'medium', 'hard'], nullable: true })
  difficulty_level!: string;

  @Column({ name: 'activity_type', type: 'varchar', length: 100, nullable: true })
  activity_type!: string;

  @ManyToOne(() => Category, (category) => category.category_id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @Column({ name: 'category_id', type: 'int', nullable: true })
  category_id!: number;

  @Column({ name: 'activity_location', type: 'text', nullable: true })
  activity_location!: string;

  @Column({ name: 'activity_adress', type: 'text', nullable: true })
  activity_adress!: string;

  @Column({ name: 'activity_images', type: 'json', nullable: true })
  activity_images!: string[];

  @Column({ name: 'activity_videos', type: 'json', nullable: true })
  activity_videos!: string[];

  @Column({ name: 'includes', type: 'text', nullable: true })
  includes!: string;

  @Column({ name: 'excludes', type: 'text', nullable: true })
  excludes!: string;

  @Column({ name: 'privacy_policy', type: 'boolean', default: false })
  privacy_policy!: boolean;

  @Column({ name: 'registration_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registration_date!: Date;
}
