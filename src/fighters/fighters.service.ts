import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFighterDto } from './dto/create-fighter.dto';
import { UpdateFighterDto } from './dto/update-fighter.dto';
import { Fighter } from './entities/fighter.entity';

@Injectable()
export class FightersService {
  constructor(
    @InjectRepository(Fighter)
    private readonly fighterRepository: Repository<Fighter>,
  ) {}

  async create(createFighterDto: CreateFighterDto): Promise<Fighter> {
    const fighter = this.fighterRepository.create(createFighterDto);
    return await this.fighterRepository.save(fighter);
  }

  async findAll() {
    const fighters = await this.fighterRepository.find();

    if (fighters.length === 0) {
      throw new BadRequestException('Not found fighters');
    }
    return fighters;
  }

  async findOne(id: number) {
    const fighter = await this.fighterRepository.findOne({
      where: { id },
    });

    if (!fighter) {
      throw new BadRequestException('Fighter not found');
    }

    return fighter;
  }

  async update(id: number, updateFighterDto: UpdateFighterDto) {
    const fighter = await this.fighterRepository.findOneBy({ id });

    if (!fighter) {
      throw new BadRequestException('Fighter not found');
    }

    try {
      const updateFighter = Object.assign(fighter, updateFighterDto);
      await this.fighterRepository.save(updateFighter);

      const updatedFighter = await this.fighterRepository.findOne({
        where: { id },
      });
      return updatedFighter;
    } catch (error) {
      console.log(error);
    }
    return `This action updates a #${id} fighter`;
  }

  async remove(id: number) {
    const fighter = await this.fighterRepository.findOneBy({ id });

    if (!fighter) {
      throw new BadRequestException('Fight not found');
    }
    try {
      await this.fighterRepository.softRemove(fighter);
      return { msg: 'Fighter deleted' };
    } catch (error) {
      console.log(error);
    }
  }
}
