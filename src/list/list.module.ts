import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../models/user.schema';
import { UserListService } from './list.service';
import { UserListController } from './list.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    CacheModule.register({ ttl: 3600, max: 100 }),
  ],
  providers: [UserListService],
  controllers: [UserListController],
})
export class UserListModule {}