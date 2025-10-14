import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  //Register user
  async createUser(date: UserDto): Promise<UserEntity> {
    const validate = await this.validateExists(date.email, date.phone);
    if (validate)
      throw new BadRequestException('El correo o telefono ya existe');

    const new_user = new UserEntity();
    new_user.email = date.email;
    new_user.password = await bcrypt.hash(date.password, 10);
    new_user.name = date.name;
    new_user.lastname = date.lastname;
    new_user.phone = date.phone;
    new_user.role = date.rol;
    return this.userRepository.save(new_user);
  }

  async validateExists(mail: string, phon: string): Promise<boolean> {
    const validate = await this.userRepository.exists({
      where: [{ email: mail }, { phone: phon }],
    });
    return validate;
  }

  //Login user
  async loginUser(date: UserDto) {
    const user = await this.userRepository.findOne({
      where: { email: date.email },
    });
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    const validate_password = await bcrypt.compare(
      date.password,
      user.password,
    );
    if (!validate_password) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = { sub: user.uuid_user, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user,
    };
  }
}
