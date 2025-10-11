import { Body, Controller, Post } from '@nestjs/common';
import { log } from 'console';

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async resgisterUser(@Body() date: UserDto) {
    const newUser = await this.userService.createUser(date);
    return {
      message: 'Usuario creado correctamente',
      status: 201,
    };
  }

  @Post('login')
  async loginUser(@Body() date: UserDto) {
    const login = await this.userService.loginUser(date);
    const { password, ...userNotPassword } = login.user;
    return {
      message: 'Login exitoso',
      status: 200,
      token: login.token,
      login: userNotPassword,
    };
  }
}
