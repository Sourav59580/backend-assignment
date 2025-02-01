import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserListService } from './list.service';
import { User } from '../models/user.schema';

@Controller('users/:username/my-list')
export class UserListController {
  constructor(private readonly userListService: UserListService) {}

  @Post()
  async addToList(
    @Param('username') username: string,
    @Body('contentId') contentId: string,
    @Body('contentType') contentType: string,
  ): Promise<User> {
    try {
      return await this.userListService.addToList(
        username,
        contentId,
        contentType,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':contentId')
  async removeFromList(
    @Param('username') username: string,
    @Param('contentId') contentId: string,
  ): Promise<User> {
    try {
      return await this.userListService.removeFromList(username, contentId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getUserList(@Param('username') username: string): Promise<User> {
    try {
      return await this.userListService.getUserList(username);
    } catch (error) {
      console.log('error: ', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
