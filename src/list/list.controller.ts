import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { User } from '../models/user.schema';
import { UserListService } from './list.service';

@Controller('list')
export class UserListController {
  constructor(private readonly userListService: UserListService) {}

  @Get()
  async getUserList(
    @Query('username') username: string,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ): Promise<{ items: any[]; total: number }> {
    try {
      return await this.userListService.getUserList(username, Number(limit), Number(offset));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async addToList(
    @Body('username') username: string,
    @Body('contentId') contentId: string,
    @Body('contentType') contentType: string,
  ): Promise<User> {
    try {
      return await this.userListService.addToList(username, contentId, contentType);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  async removeFromList(
    @Body('username') username: string,
    @Body('contentId') contentId: string,
  ): Promise<User> {
    try {
      return await this.userListService.removeFromList(username, contentId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
