import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private user: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.user.findAll();
  }
}
