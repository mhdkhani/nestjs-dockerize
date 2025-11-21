import { Controller, Get, Post, Body, UsePipes, ValidationPipe  } from "@nestjs/common";
import { UserService } from "./user.service";
import {CreateUserApiBodyDto, LoginUserApiBodyDto} from "../../dto/user/user.dto";

@Controller("public/v1/user")
export class UserController {
  constructor(public userService: UserService) {}

  @Get("/all")
  async getAllUsers() {
    return this.userService.findAll();
  }

  @Post("/register")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async _register(
      @Body() body: CreateUserApiBodyDto
  ) {
    return this.userService._register(body);
  }

  @Post("/login")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async _login(
      @Body() body: LoginUserApiBodyDto
  ) {
    return this.userService._login(body);
  }
}
