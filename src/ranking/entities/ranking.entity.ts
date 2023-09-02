import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Fighter } from '../../fighters/entities/fighter.entity';

@Entity()
export class Ranking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weightClass: string;

  @ManyToOne(() => Fighter, (fighter) => fighter.rankings)
  fighter: Fighter;

  @Column({ default: 1 })
  rankingPosition: number;
}
