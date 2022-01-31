import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { id: user.id, login: user.login };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const users = await this.usersService.findAll();
    const { login } = userDto;
    const candidate = users.find((user) => user.login === login);
    if (!candidate)
      throw new UnauthorizedException({
        message: 'Incorrect data entry',
      });

    return candidate;
  }
}
