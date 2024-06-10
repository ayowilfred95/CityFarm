import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Booking } from './booking.entity';
import { GreenhouseOwner } from './greenhouse-owner.entity';

@Entity()
export class Plot {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => GreenhouseOwner, owner => owner.plots)
  owner: GreenhouseOwner;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  dimension: number;

  @Column()
  location: string;

  @Column()
  availability: boolean;

  @Column('text')
  description: string;

  @Column('simple-array')
  supportedCrops: string[];

  @Column('simple-array', { nullable: true })
  photos: string[];

  @OneToOne(() => Booking, booking => booking.plot)
  @JoinColumn()
  booking: Booking;

}
