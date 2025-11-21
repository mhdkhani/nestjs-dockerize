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

  async createUser(body: CreateUserApiBodyDto): Promise<User> {
    const { username, email, password } = body;
    const user = this.userRepository.create({
      username,
      email,
      password,
    });
    const saved = await this.userRepository.save(user);
    delete saved.password;
    return saved
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }
}
