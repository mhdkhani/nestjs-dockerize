import { Injectable, Logger, BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

import { User } from "./user.entity";
import { CreateUserApiBodyDto, LoginUserApiBodyDto } from "../../dto/user/user.dto";

@Injectable()
export class UserService {
  protected readonly logger = new Logger(UserService.name);

  constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * REGISTER USER
   */
  async _register(body: CreateUserApiBodyDto) {
    const { username, email, password } = body;
    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });
    if (existingUser)
      throw new BadRequestException('User with this email or username already exists.');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });
    const saved = await this.userRepository.save(user);
    delete saved.password;
    return {
      message: 'User registered successfully',
      user: saved,
    };
  }

  /**
   * LOGIN USER
   */
  async _login(body: LoginUserApiBodyDto) {
    const { email, password } = body;

    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user)
      throw new NotFoundException('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new BadRequestException('Invalid password');

    delete user.password;
    return {
      message: 'Login successful',
      user,
    };
  }
}
