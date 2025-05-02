import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Category')
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  category_id!: number;

  @Column({ name: 'category_name', type: 'varchar', unique: true, length: 100, nullable: false })
  category_name!: string;

  @Column({ name: 'category_description', type: 'text', nullable: true })
  category_description!: string;

  @Column({ name: 'category_image', type: 'varchar', length: 255, nullable: true })
  category_image!: string;
}