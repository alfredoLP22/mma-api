import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { Fight } from '../../fight/entities/fight.entity';
import { Fighter } from '../../fighters/entities/fighter.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  location: string;

  @ManyToMany(() => Fighter)
  @JoinTable()
  fighters: Fighter[];

  @OneToMany(() => Fight, (fight) => fight.event)
  fights: Fight[];

  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(event: Partial<Event>) {
    Object.assign(this, event);
  }
}
