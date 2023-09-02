import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateFightDto {
  @IsOptional()
  readonly id?: number;

  @IsString()
  readonly name: string;

  @IsArray()
  readonly fighters: number[];

  @IsInt()
  readonly event: number;
}
