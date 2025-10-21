import { Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { EmailService } from 'src/email/email.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  @Post('register')
  async resgisterUser(@Body() date: UserDto) {
    const user = await this.userService.registerUser(date);

    if (!user.confirmationToken) {
      throw new InternalServerErrorException('No se pudo generar el token de confirmación.');
    }

    await this.emailService.sendConfirmationEmail(user, user.confirmationToken);
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
