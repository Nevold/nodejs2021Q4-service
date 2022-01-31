import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.findUserById(id);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userDto: CreateUserDto) {
    return this.usersService.updateUser(id, userDto);
  }
}
