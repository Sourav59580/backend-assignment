import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsDate,
  ArrayMinSize,
  IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { genre } from '../../constants/constants';
export class CreateMovieDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: [String], enum: genre })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsIn(genre, { each: true })
  genres: string[];

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date) 
  releaseDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  director: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  actors: string[];
}
