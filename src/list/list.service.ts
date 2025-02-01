import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models/user.schema';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';

@Injectable()
export class UserListService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async getUserList(username: string, limit: number, offset: number): Promise<{ items: any[]; total: number }> {
    const cacheKey = `userList_${username}_${limit}_${offset}`;
    const cachedData = await this.cacheManager.get(cacheKey);

    if (cachedData) {
      return cachedData as { items: any[]; total: number };
    }

    const user = await this.userModel.findOne({ username }, 'myList').exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const total = user.myList.length;
    const paginatedList = user.myList.slice(offset, offset + limit);

    const response = { items: paginatedList, total };

    // Cache the result for 1 hour
    await this.cacheManager.set(cacheKey, response, 3600);

    return response;
  }

  async addToList(username: string, contentId: string, contentType: string): Promise<User> {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const contentExists = user.myList.some(
      (item) => item.contentId === contentId && item.contentType === contentType,
    );

    if (contentExists) {
      throw new BadRequestException('Content is already in your list');
    }

    user.myList.push({ contentId, contentType });

    await user.save();

    // Invalidate cache after update
    await this.cacheManager.del(`userList_${username}`);

    return user;
  }

  async removeFromList(username: string, contentId: string): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { username },
      { $pull: { myList: { contentId } } },
      { new: true },
    );

    if (!user) {
      throw new NotFoundException('User not found or content not in the list');
    }

    // Invalidate cache after update
    await this.cacheManager.del(`userList_${username}`);

    return user;
  }
}
