import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async resgisterUser(@Body() date: UserDto) {
    await this.userService.createUser(date);
    return {
      message: 'Usuario creado correctamente',
      status: 201,
    };
  }

  @Post('login')
  async loginUser(@Body() date: UserDto) {
    const login = await this.userService.loginUser(date);
    const { password: _password, ...user_not_password } = login.user;
    return {
      message: 'Login exitoso',
      status: 200,
      token: login.token,
      login: user_not_password,
    };
  }
}
