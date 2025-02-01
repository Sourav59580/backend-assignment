import { IsNotEmpty, IsString, IsArray, ArrayMinSize, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EpisodeDto } from './episode.dto';
import { genre } from '../../constants/constants';

export class CreateTVshowDto {
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

  @ApiProperty({ type: [EpisodeDto] })
  @IsArray()
  episodes: EpisodeDto[];
}
