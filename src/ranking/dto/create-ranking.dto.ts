import { IsNumber, IsString, IsInt } from 'class-validator';

export class CreateRankingDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly weightClass: string;

  @IsInt()
  readonly fighter: number;

  @IsNumber()
  readonly rankingPosition?: number;
}
