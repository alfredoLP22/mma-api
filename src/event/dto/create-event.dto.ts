import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Fight } from '../../fight/entities/fight.entity';
import { Fighter } from '../../fighters/entities/fighter.entity';

export class CreateEventDto {
  @IsOptional()
  readonly id?: number;

  @IsString()
  readonly name: string;

  @IsString()
  @IsNotEmpty({ message: 'Give a location' })
  readonly location: string;

  @IsDate({ message: 'Give a valid date' })
  readonly date: Date;

  @IsArray()
  @IsOptional()
  readonly fighters?: Fighter[];

  @IsArray()
  @IsOptional()
  readonly fights?: Fight[];
}
