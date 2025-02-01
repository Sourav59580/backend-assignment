import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TVShow, TVShowDocument } from '../models/tvshow.schema';
import { CreateTVshowDto } from './dto/create-tvshow.dto';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PaginationResponse } from 'src/types/pagination-response.interface';

@Injectable()
export class TVShowsService {
  private readonly totalCacheKey = 'tv-shows-total-count';
  constructor(
    @InjectModel(TVShow.name)
    private readonly tvShowModel: Model<TVShowDocument>,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async findAll(page: number = 1, limit: number = 10): Promise<PaginationResponse<TVShow>> {
    const cacheKey = `tv-shows-page-${page}-limit-${limit}`;
    const cachedShows = await this.cache.get<TVShow[]>(cacheKey);
    const totalShows = await this.cache.get<number>(this.totalCacheKey);

    if (cachedShows && totalShows !== undefined) {
      return {
        total: totalShows,
        page,
        limit,
        rows: cachedShows,
      };
    }

    const totalCount = totalShows || (await this.tvShowModel.countDocuments().exec());
    const shows = await this.tvShowModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec();

    await this.cache.set(cacheKey, shows, 3600);
    await this.cache.set(this.totalCacheKey, totalCount, 3600);

    return {
      total: totalCount,
      page,
      limit,
      rows: shows,
    };
  }

  async create(createTVShowDto: CreateTVshowDto): Promise<TVShow> {
    const createdTVShow = new this.tvShowModel(createTVShowDto);
    const savedTvShow = await createdTVShow.save();
    const currentTotal = await this.cache.get<number>(this.totalCacheKey);
    
    if (currentTotal !== undefined) {
      await this.cache.set(this.totalCacheKey, currentTotal + 1, 3600);
    } else {
      await this.cache.set(this.totalCacheKey, 1, 3600);
    }

    await this.cache.del('tv-shows-page-1-limit-10');
    return savedTvShow;
  }
}
