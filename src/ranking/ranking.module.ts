import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { Ranking } from './entities/ranking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from 'src/fighters/entities/fighter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ranking, Fighter])],
  controllers: [RankingController],
  providers: [RankingService],
})
export class RankingModule {}
