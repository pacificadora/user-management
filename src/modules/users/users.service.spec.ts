import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;
  let jwtService: JwtService;
  let configService: ConfigService;

  const mockUser = {
    id: 1,
    name: 'John Doe',
    mobile: '9876543210',
    password: '',
    status: false,
    ipAddress: '0.0.0.0',
    lastLogin: new Date('2025-03-19 06:35:07.794013'),
    created_at: new Date ('2025-03-19 06:35:07.794013')
  };

  const mockUserWithoutPassword = {
    id: 1,
    name: 'John Doe',
    mobile: '9876543210',
    ipAddress: '0.0.0.0',
    lastLogin: new Date('2025-03-19T01:05:07.794Z'),
    created_at: new Date('2025-03-19T01:05:07.794Z'),
    status: false,
  };

  beforeEach(async () => {
    mockUser.password = await bcrypt.hash('password123', 10);
    console.log('Hashed Password:', mockUser.password); 
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            getUserByMobile: jest.fn(),
            createUser: jest.fn().mockResolvedValue(mockUser),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockJwtToken'),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key) => {
              if (key === 'JWT_PUBLIC_SECRET') return 'testSecret';
              if (key === 'JWT_EXPIRY_TIME') return '1h';
              return null;
            }),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('signUp', () => {
    it('should throw an error if mobile is invalid', async () => {
      await expect(
        usersService.signUp({
          name: 'John',
          email: 'johnDoe@gmail.com',
          mobile: '123456789',
          password: 'password123',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw an error if user already exists', async () => {
      jest.spyOn(usersRepository, 'getUserByMobile').mockResolvedValue(mockUser);

      await expect(
        usersService.signUp({
          name: 'John',
          email: 'johnDoe@gmail.com',
          mobile: '9876543210',
          password: 'password123',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should successfully create a user and return it', async () => {
      jest.spyOn(usersRepository, 'getUserByMobile').mockResolvedValue(null);

      const result = await usersService.signUp({
        name: 'John',
        email: 'johnDoe@gmail.com',
        mobile: '9876543210',
        password: 'password123',
      });

      expect(result).toEqual(mockUserWithoutPassword);
    });
  });

  describe('loginUser', () => {
    it('should throw an error if user is not found', async () => {
      jest.spyOn(usersRepository, 'getUserByMobile').mockResolvedValue(null);

      await expect(
        usersService.loginUser({ mobile: '9876543212', password: 'hashedPassword' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw an error if password is incorrect', async () => {
      jest.spyOn(usersRepository, 'getUserByMobile').mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(
        usersService.loginUser({ mobile: '9876543210', password: 'hashedPassword' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should return user with token on successful login', async () => {
      jest.spyOn(usersRepository, 'getUserByMobile').mockResolvedValue(mockUser);
      // jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await usersService.loginUser({
        mobile: '9876543210',
        password: 'password123',
      });

      expect(result).toEqual({
        ...mockUserWithoutPassword,
        token: 'mockJwtToken',
      });
    });
  });
});
