import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Plot } from './plot.entity';

@Entity()
export class GreenhouseOwner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Plot, plot => plot.owner)
  plots: Plot[];
}
