import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from '../models/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: any): Promise<User> {
    return this.userService.createUser(userData);
  }

  @Get(':username')
  async getUser(@Param('username') username: string): Promise<User | null> {
    return this.userService.getUserByUsername(username);
  }
}
