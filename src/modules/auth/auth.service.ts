import { Injectable, UnauthorizedException , BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import {CreateUserApiBodyDto, LoginUserApiBodyDto} from '../../dto/user/user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(body: CreateUserApiBodyDto){
    const user = await this.userService.findByEmail(body.email);
    if (user)
        throw new BadRequestException('User with this email already exists.');

    body.password = await bcrypt.hash(body.password, 10);
    return {
      message: 'User registered successfully',
      user: await this.userService.createUser(body),
    };
  }

  async login(body: LoginUserApiBodyDto) {
    const user = await this.userService.findByEmail(body.email);
    if (!user || !(await bcrypt.compare(body.password, user.password)))
        throw new UnauthorizedException('Invalid credentials');

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, username: user.username, email: user.email },
    };
  }

}

