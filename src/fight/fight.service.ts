import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateFightDto } from './dto/create-fight.dto';
import { UpdateFightDto } from './dto/update-fight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Fight } from './entities/fight.entity';
import { Repository } from 'typeorm';
import { Fighter } from '../fighters/entities/fighter.entity';
import { Event } from '../event/entities/event.entity';

@Injectable()
export class FightService {
  constructor(
    @InjectRepository(Fight)
    private readonly fightRepository: Repository<Fight>,
    @InjectRepository(Fighter)
    private readonly fighterRepository: Repository<Fighter>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}
  async create(createFightDto: CreateFightDto) {
    if (
      createFightDto.fighters.length > 2 ||
      createFightDto.fighters.length < 2
    ) {
      throw new BadRequestException('You should send two fighters');
    }

    const [firstFighter, secondFighter] = await Promise.all([
      this.fighterRepository.findOneBy({
        id: createFightDto.fighters[0],
      }),
      this.fighterRepository.findOneBy({
        id: createFightDto.fighters[1],
      }),
    ]);

    if (!firstFighter || !secondFighter) {
      throw new BadRequestException('Fighters not found');
    }

    const event = await this.eventRepository.findOneBy({
      id: createFightDto.event,
    });

    if (!event) {
      throw new BadRequestException('Event not found');
    }

    const fight = new Fight();
    fight.fighters = [firstFighter, secondFighter];
    fight.name = createFightDto.name;
    fight.event = event.id;

    const fightAdded = await this.fightRepository.save(fight);

    return fightAdded;
  }

  async findAll() {
    const fights = await this.fightRepository.find({
      relations: ['event', 'fighters'],
    });

    if (fights.length === 0) {
      throw new BadRequestException('Not fights found');
    }
    return fights;
  }

  async findOne(id: number) {
    const fight = await this.fightRepository.findOne({
      relations: ['fighters', 'event'],
      where: { id },
    });

    if (!fight) {
      throw new BadRequestException('Fight not found');
    }

    return fight;
  }

  async update(id: number, updateFightDto: UpdateFightDto) {
    const fight = await this.fightRepository.findOneBy({ id });

    if (!fight) {
      throw new BadRequestException('Fight not found');
    }

    try {
      const updatedFight = Object.assign(fight, updateFightDto);
      await this.fightRepository.save(updatedFight);
      const updatedFigth = await this.fightRepository.findOne({
        where: { id: fight.id },
        relations: ['fighters', 'event'],
      });
      return updatedFigth;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    const fight = await this.fightRepository.findOneBy({ id });

    if (!fight) {
      throw new BadRequestException('Fight not found');
    }
    try {
      await this.fightRepository.softRemove(fight);
      return { msg: 'Fight deleted' };
    } catch (error) {
      console.log(error);
    }
  }
}
