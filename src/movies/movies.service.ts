import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from '../models/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PaginationResponse } from 'src/types/pagination-response.interface';

@Injectable()
export class MoviesService {
  private readonly totalCacheKey = 'movies-total-count';
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async findAll(page: number = 1, limit: number = 10): Promise<PaginationResponse<Movie>> {
    const cacheKey = `movies-page-${page}-limit-${limit}`;
    const cachedMovies = await this.cache.get<any>(cacheKey);
    const totalMovies = await this.cache.get<number>(this.totalCacheKey);

    if (cachedMovies && totalMovies !== undefined) {
      return {
        total: totalMovies,
        page,
        limit,
        rows: cachedMovies,
      };
    }

    const totalCount = totalMovies || (await this.movieModel.countDocuments().exec());

    const movies = await this.movieModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec();

    const result = {
      total: totalCount,
      page,
      limit,
      rows: movies,
    };

    await this.cache.set(cacheKey, movies, 3600);
    await this.cache.set(this.totalCacheKey, totalCount, 3600);

    return result;
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const createdMovie = new this.movieModel(createMovieDto);
    const savedMovie = await createdMovie.save();
    const currentTotal = await this.cache.get<number>(this.totalCacheKey);
    
    if (currentTotal !== undefined) {
      await this.cache.set(this.totalCacheKey, currentTotal + 1, 3600);
    } else {
      await this.cache.set(this.totalCacheKey, 1, 3600);
    }

    await this.cache.del('movies-page-1-limit-10');
    return savedMovie;
  }
}
