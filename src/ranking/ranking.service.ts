import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ranking } from './entities/ranking.entity';
import { Fighter } from '../fighters/entities/fighter.entity';
import { CreateRankingDto } from './dto/create-ranking.dto';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Ranking)
    private readonly rankingRepository: Repository<Ranking>,
    @InjectRepository(Fighter)
    private readonly fighterepository: Repository<Fighter>,
  ) {}

  async getRanking(weightClass) {
    const ranking = await this.rankingRepository.findOne({
      where: { weightClass },
      relations: ['fighter'],
    });

    if (!ranking) {
      throw new BadRequestException('Ranking not exists');
    }
    const rankings = await this.fighterepository
      .createQueryBuilder('fighter')
      .select([
        'fighter.id',
        'fighter.name',
        'fighter.weightClass',
        'fighter.wins',
      ])
      .addSelect(
        `(RANK() OVER (PARTITION BY fighter."weightClass" ORDER BY fighter.wins DESC))`,
        'rank',
      )
      .orderBy('fighter."weightClass"')
      .addOrderBy('fighter.wins', 'DESC')
      .getRawMany();

    return rankings;
  }

  async setRanking(createRankingDto: CreateRankingDto) {
    const { weightClass, fighter } = createRankingDto;

    const fighterToRanking = await this.fighterepository.findOneBy({
      id: fighter,
    });

    if (!fighterToRanking) {
      throw new BadRequestException('Fighter not found');
    }

    const createRanking = new Ranking();
    createRanking.fighter = fighterToRanking;
    createRanking.weightClass = weightClass;

    const rankingCreated = await this.rankingRepository.save(createRanking);
    return rankingCreated;
  }
}
