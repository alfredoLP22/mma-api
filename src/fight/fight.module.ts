import { Module } from '@nestjs/common';
import { FightService } from './fight.service';
import { FightController } from './fight.controller';
import { Fight } from './entities/fight.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from '../fighters/entities/fighter.entity';
import { Event } from '../event/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fight, Fighter, Event])],
  controllers: [FightController],
  providers: [FightService],
})
export class FightModule {}
