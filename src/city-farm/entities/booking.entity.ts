import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne} from 'typeorm';
import { User } from './user.entity';
import { Plot } from './plot.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.bookings)
  user: User;

  @OneToOne(() => Plot, plot => plot.booking)
  plot: Plot;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ default: 'pending' })
  status: string; // confirmed, pending, canceled
}
