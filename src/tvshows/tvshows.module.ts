import { Module } from '@nestjs/common';
import { TVShowsService } from './tvshows.service';
import { TVShowsController } from './tvshows.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TVShow, TVShowSchema } from '../models/tvshow.schema';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: TVShow.name, schema: TVShowSchema }]), // Register Movie model with Mongoose
    CacheModule.register({ ttl: 3600, max: 100 }),
  ],
  controllers: [TVShowsController],
  providers: [TVShowsService],
})
export class TvshowsModule {}
