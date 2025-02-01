import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TVShowsService } from './tvshows.service';
import { CreateTVshowDto } from './dto/create-tvshow.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('TV Shows')
@Controller('tvshows')
export class TVShowsController {
  constructor(private readonly tvShowsService: TVShowsService) {}

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    try {
      const pageNum = parseInt(page, 10) || 1;
      const limitNum = parseInt(limit, 10) || 10;

      const tvShows = await this.tvShowsService.findAll(pageNum, limitNum);
      return tvShows;
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to fetch tv-shows' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createTVShowDto: CreateTVshowDto) {
    try {
      const tvShow = await this.tvShowsService.create(createTVShowDto);
      return tvShow;
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to create tv-show' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
