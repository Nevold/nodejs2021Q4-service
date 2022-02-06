import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findUserById(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createUser(dto: CreateUserDto) {
    const { name, login, password } = dto;
    const hash = await bcrypt.hash(password, 5);
    const newUser = {
      name,
      login,
      password: hash,
    };
    const user = await this.usersRepository.save(newUser);
    const savedUser = { id: user.id, login: user.login, name: user.name };
    return savedUser;
  }

  async updateUser(id: string, dto: CreateUserDto) {
    const { name, login, password } = dto;
    const hash = await bcrypt.hash(password, 5);
    const updateUser = {
      name,
      login,
      password: hash,
    };
    const user = this.usersRepository.save({ id, ...updateUser });
    return user;
  }
}
