import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { UserData } from './UserData';
import { Activity } from './Activity';

@Entity('Registration')
@Index(['user_id'])
@Index(['activity_id'])
export class Registration {
  @PrimaryGeneratedColumn({ name: 'registration_id' })
  registration_id!: number;

  @ManyToOne(() => UserData, (userData) => userData.user_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  userData!: UserData;

  @Column({ name: 'user_id', type: 'int', nullable: false })
  user_id!: number;

  @ManyToOne(() => Activity, (activity) => activity.activity_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'activity_id' })
  activity!: Activity;

  @Column({ name: 'activity_id', type: 'int', nullable: false })
  activity_id!: number;

  @Column({ name: 'registration_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registration_date!: Date;
}
