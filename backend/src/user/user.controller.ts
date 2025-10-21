import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async resgisterUser(@Body() date: UserDto) {
    await this.userService.registerUser(date);
    return {
      message: 'Usuario creado correctamente',
      status: 201,
    };
  }
  
  @Post('validate-email')
  async validateEmail(@Body('email') email: string){
    const exists = await this.userService.validateExists(email)
    return {
      exists,
      message: exists ? 'El correo ya esta registrado' :'El usuario no existe '
    }
  }
}
