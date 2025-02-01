import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
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

  async addToList(
    username: string,
    contentId: string,
    contentType: string,
  ): Promise<User> {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    const contentExists = user.myList.some(
      (item) =>
        item.contentId === contentId && item.contentType === contentType,
    );

    if (contentExists) {
      throw new BadRequestException('Content is already in your list');
    }

    user.myList.push({ contentId, contentType });

    await user.save();

    await this.cacheManager.del(`userList_${username}`);

    return user;
  }

  async removeFromList(username: string, contentId: string): Promise<User> {
    const user = await this.userModel
      .findOneAndUpdate(
        { username },
        { $pull: { myList: { contentId } } },
        { new: true },
      )
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Invalidate cache after update
    await this.cacheManager.del(`userList_${username}`);

    return user;
  }

  async getUserList(username: string): Promise<User> {
    // Check cache first
    const cachedUserList = await this.cacheManager.get(`userList_${username}`);
    if (cachedUserList) {
      return cachedUserList as User;
    }

    const user = await this.userModel.findOne({ username }, 'myList').exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Cache the result
    await this.cacheManager.set(`userList_${username}`, user, 3600);

    return user;
  }
}
