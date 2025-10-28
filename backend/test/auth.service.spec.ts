import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthService } from '../src/auth/auth.service';
import { UserService } from '../src/user/user.service';
import { UserEntity } from '../src/user/entity/user.entity';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  const mockUserService = {
    search_email: jest.fn(),
    userRepository: { save: jest.fn() },
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);

    jest.clearAllMocks();
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('debería retornar un access_token si las credenciales son válidas', async () => {
      const user: UserEntity = {
        uuid_user: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test',
        lastname: 'User',
        role: 'student',
        isConfirmed: true,
        confirmationToken: null,
      };
      const loginDto = { email: 'test@example.com', password: 'password123' };
      const token = 'jwt-token';

      mockUserService.search_email.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue(token);

      const result = await service.login(loginDto);

      expect(userService.search_email).toHaveBeenCalledWith(loginDto.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginDto.password,
        user.password,
      );
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: user.uuid_user,
        email: user.email,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      expect(result).toEqual({ token, user: userWithoutPassword });
    });

    it('debería lanzar UnauthorizedException si el usuario no existe', async () => {
      const loginDto = { email: 'wrong@example.com', password: 'password123' };
      mockUserService.search_email.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('debería lanzar UnauthorizedException si la contraseña es incorrecta', async () => {
      const user: UserEntity = {
        uuid_user: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test',
        lastname: 'User',
        role: 'student',
        isConfirmed: true,
        confirmationToken: null,
      };
      const loginDto = { email: 'test@example.com', password: 'wrongpassword' };

      mockUserService.search_email.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
