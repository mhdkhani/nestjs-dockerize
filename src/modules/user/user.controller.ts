import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller("public/v1/user")
export class UserController {
  constructor(public userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return req.user;
  }

}
