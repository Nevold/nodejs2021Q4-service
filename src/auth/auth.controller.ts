import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  //   @Post('/registration')
  //   registration(@Body() userDto: CreateUserDto) {
  //     return this.authService.registration(userDto);
  //   }
}
