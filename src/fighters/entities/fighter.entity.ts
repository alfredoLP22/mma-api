import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ranking } from 'src/ranking/entities/ranking.entity';

@Entity()
export class Fighter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'integer', default: 0 })
  wins: number;

  @Column({ type: 'integer', default: 0 })
  losses: number;

  @Column({ type: 'integer', default: 0 })
  knockouts: number;

  @Column({ type: 'integer', default: 0 })
  submissions: number;

  @Column({ type: 'varchar', length: 30 })
  weightClass: string;

  @Column({ type: 'varchar', length: 30 })
  nationality: string;

  @Column({ type: 'varchar', length: 30 })
  team: string;

  @OneToMany(() => Ranking, (ranking) => ranking.fighter)
  rankings: Ranking[];

  @DeleteDateColumn()
  deletedAt?: Date;

  // constructor(fighter: Partial<Fighter>) {
  //   Object.assign(this, fighter);
  // }
}
