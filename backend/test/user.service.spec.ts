import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { BadRequestException } from '@nestjs/common';

import { UserService } from '../src/user/user.service';
import { UserEntity } from '../src/user/entity/user.entity';
import { UserDto } from '../src/user/dto/user.dto';

jest.mock('bcrypt');
jest.mock('crypto');

describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    exists: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerUser', () => {
    it('debería registrar un nuevo usuario y retornar la entidad guardada', async () => {
      const userDto: UserDto = {
        name: 'Test',
        lastname: 'User',
        email: 'test@example.com',
        password: 'password123',
        role: 'student',
      };
      const hashedPassword = 'hashedPassword';
      const confirmationToken = 'random-token';

      mockUserRepository.exists.mockResolvedValue(false);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      (crypto.randomBytes as jest.Mock).mockReturnValue({
        toString: () => confirmationToken,
      });
      mockUserRepository.save.mockImplementation((user) =>
        Promise.resolve(user),
      );

      const result = await service.registerUser(userDto);

      expect(mockUserRepository.exists).toHaveBeenCalledWith({
        where: [{ email: userDto.email }],
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(userDto.password, 10);
      expect(crypto.randomBytes).toHaveBeenCalledWith(32);
      expect(mockUserRepository.save).toHaveBeenCalled();
      expect(result.email).toBe(userDto.email);
      expect(result.password).toBe(hashedPassword);
      expect(result.confirmationToken).toBe(confirmationToken);
    });

    it('debería lanzar BadRequestException si el email ya existe', async () => {
      const userDto: UserDto = {
        name: 'Test',
        lastname: 'User',
        email: 'exists@example.com',
        password: 'password123',
        role: 'student',
      };

      mockUserRepository.exists.mockResolvedValue(true);

      await expect(service.registerUser(userDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
