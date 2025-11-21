import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import {CreateUserApiBodyDto, LoginUserApiBodyDto} from '../../dto/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() body: CreateUserApiBodyDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() body: LoginUserApiBodyDto) {
    return this.authService.login(body);
  }
}

