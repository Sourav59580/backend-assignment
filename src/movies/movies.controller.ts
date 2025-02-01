import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    try {
      const pageNum = parseInt(page, 10) || 1;
      const limitNum = parseInt(limit, 10) || 10;
      
      const movies = await this.moviesService.findAll(pageNum, limitNum);
      return movies;
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to fetch movies' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    try {
      const movie = await this.moviesService.create(createMovieDto);
      return movie;
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to create movie' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
