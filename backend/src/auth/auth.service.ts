import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { UserEntity } from '../user/entity/user.entity';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: AuthDto) {
    const user = await this.userService.search_email(data.email);

    if (!user || !user.password) {
      // Si el usuario no existe o no tiene contraseña (p.ej. registro con Google)
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    if (!user.isConfirmed) {
      throw new UnauthorizedException(
        'Por favor, confirma tu correo electrónico para iniciar sesión.',
      );
    }

    return this.generateTokenAndUserResponse(user);
  }

  async signInWithGoogle(googleUser: GoogleAuthDto) {
    if (!googleUser || !googleUser.email) {
      throw new BadRequestException(
        'No se recibió información del usuario de Google.',
      );
    }

    let user = await this.userService.search_email(googleUser.email);

    if (!user) {
      const newUser = new UserEntity();
      newUser.email = googleUser.email;
      newUser.name = googleUser.name;
      newUser.lastname = googleUser.lastname;
      newUser.isConfirmed = true;
      user = await this.userService.userRepository.save(newUser);
    }

    return this.generateTokenAndUserResponse(user);
  }

  private generateTokenAndUserResponse(user: UserEntity) {
    const payload = { sub: user.uuid_user, email: user.email };
    const token = this.jwtService.sign(payload);
    const { password: _password, ...userWithoutPassword } = user;

    return { token, user: userWithoutPassword };
  }

  async confirmEmail(token: string) {
    const user = await this.userService.findByConfirmationToken(token);

    if (!user) {
      throw new NotFoundException(
        'Token de confirmación no válido o expirado.',
      );
    }

    user.isConfirmed = true;
    user.confirmationToken = null;
    await this.userService.userRepository.save(user);

    return {
      message:
        'Correo electrónico confirmado con éxito. Ya puedes iniciar sesión.',
    };
  }
}
