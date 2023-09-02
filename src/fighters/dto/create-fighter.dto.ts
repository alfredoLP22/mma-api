import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Fight } from '../../fight/entities/fight.entity';

export class CreateFighterDto {
  @IsOptional()
  readonly id?: number;

  @IsString()
  @MinLength(2, { message: 'Name must have atleast 5 characters.' })
  @IsNotEmpty()
  readonly name: string;

  @IsInt()
  readonly wins: number;

  @IsInt()
  readonly losses: number;

  @IsInt()
  readonly knockouts: number;

  @IsInt()
  readonly submissions: number;

  @IsString()
  @MinLength(2, { message: 'Weight class must have atleast 2 characters.' })
  @MaxLength(20, { message: 'Weight class has a limit of 20 characters.' })
  @IsNotEmpty()
  readonly weightClass: string;

  @IsString()
  @MinLength(3, {
    message: 'Nationality class must have atleast 2 characters.',
  })
  @MaxLength(20, { message: 'Nationality has a limit of 20 characters.' })
  @IsNotEmpty()
  readonly nationality;

  @IsString()
  @MinLength(3, { message: 'Team must have atleast 2 characters.' })
  @MaxLength(20, { message: 'Team name has a limit of 20 characters.' })
  @IsNotEmpty()
  readonly team;

  // @IsArray()
  // @IsOptional()
  // readonly fights?: Fight[];

  @IsInt()
  @IsOptional()
  readonly fightOne?: number;

  @IsInt()
  @IsOptional()
  readonly fightTwo?: number;
}
