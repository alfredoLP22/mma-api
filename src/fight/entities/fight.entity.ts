// src/fights/fight.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Column,
  DeleteDateColumn,
} from 'typeorm';
import { Fighter } from '../../fighters/entities/fighter.entity';
import { Event } from '../../event/entities/event.entity';

@Entity()
export class Fight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @ManyToMany(() => Fighter, { cascade: true })
  @JoinTable()
  fighters: Fighter[];

  @ManyToOne(() => Event, (event) => event.fights)
  event: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}
