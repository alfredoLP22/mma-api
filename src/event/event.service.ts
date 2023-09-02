import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventRepository.create(createEventDto);
    return await this.eventRepository.save(event);
  }

  async findAll() {
    const events = await this.eventRepository.find();

    if (!events || events.length === 0) {
      throw new BadRequestException('Not events found');
    }

    return events;
  }

  async findOne(id: number) {
    const event = await this.eventRepository.findBy({ id });

    if (!event || event.length === 0) {
      throw new BadRequestException('Not event found');
    }
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.eventRepository.findOneBy({ id });

    if (!event) {
      throw new BadRequestException('Not event found');
    }

    try {
      const updatedEvent = Object.assign(event, updateEventDto);
      return await this.eventRepository.save(updatedEvent);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async remove(id: number) {
    const event = await this.eventRepository.findOneBy({ id });

    if (!event) {
      throw new BadRequestException('Event not found');
    }
    try {
      await this.eventRepository.softRemove(event);
      return { msg: 'Event was deleted successfully' };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
