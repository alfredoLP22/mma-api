import { Controller, Get, Body, Param, Post } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { CreateRankingDto } from './dto/create-ranking.dto';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get(':weightClass')
  getRanikng(@Param('weightClass') weightClass: string) {
    return this.rankingService.getRanking(weightClass);
  }

  @Post()
  update(@Body() createRankingDto: CreateRankingDto) {
    return this.rankingService.setRanking(createRankingDto);
  }
}
