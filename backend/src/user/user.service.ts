import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    public readonly userRepository: Repository<UserEntity>,
  ) {}

  //Register user
  async registerUser(date: UserDto): Promise<UserEntity> {
    const validate = await this.validateExists(date.email);
    if (validate)
      throw new BadRequestException('El correo o telefono ya existe');

    const new_user = new UserEntity();
    new_user.email = date.email;
    new_user.password = await bcrypt.hash(date.password, 10);
    new_user.name = date.name;
    new_user.lastname = date.lastname;
    new_user.role = date.role;
    new_user.confirmationToken = crypto.randomBytes(32).toString('hex');
    return this.userRepository.save(new_user);
  }

  async validateExists(mail: string): Promise<boolean> {
    const validate = await this.userRepository.exists({
      where: [{ email: mail }],
    });
    return validate;
  }

  async search_email(email: string): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user ?? undefined;
  }

  async findByConfirmationToken(
    token: string,
  ): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOne({
      where: { confirmationToken: token },
    });
    return user ?? undefined;
  }
}
