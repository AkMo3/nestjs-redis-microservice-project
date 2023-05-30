import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './users/schemas/user.schema';
import {Response} from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { MessagePattern } from '@nestjs/microservices';
import { CurrentUser } from './current-user.decorater';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User, @Res({passthrough: true}) response: Response) {
    await this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: User) {
    return user;
  }

  @Get('logout')
  async logout(@Res({passthrough: true}) response: Response) {
    return this.authService.logout(response);
  }
  
}
