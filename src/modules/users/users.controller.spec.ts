import { Test } from "@nestjs/testing";
import { TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/signup.dto";
import { LoginUserDto } from "./dto/login.dto";

describe('UsersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;
  
    const mockUser = {
      id: 1,
      name: 'Aman Singhal',
      mobile: '9876543210',
      password: 'hashedPassword',
    };
  
    const mockToken = {
      token: 'mockJwtToken',
    };
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [UsersController],
        providers: [
          {
            provide: UsersService,
            useValue: {
              signUp: jest.fn().mockResolvedValue(mockUser),
              loginUser: jest.fn().mockResolvedValue({ ...mockUser, ...mockToken }),
            },
          },
        ],
      }).compile();
  
      usersController = module.get<UsersController>(UsersController);
      usersService = module.get<UsersService>(UsersService);
    });

    describe('signUp', () => {
        it('should create a new user and return it', async () => {
          const createUserDto: CreateUserDto = {
            name: 'Aman Singhal',
            email: 'singhalaman198@gmail.com',
            mobile: '9876543210',
            password: 'password123',
        };
    
            const result = await usersController.signUp(createUserDto);
            expect(result).toEqual(mockUser);
            expect(usersService.signUp).toHaveBeenCalledWith(createUserDto);
        });
    });
    
    describe('login', () => {
        it('should login a user and return the user with a token', async () => {
            const loginDto: LoginUserDto = {
            mobile: '9876543210',
            password: 'password123',
        };
    
        const result = await usersController.login(loginDto);

        expect(result).toEqual({ ...mockUser, ...mockToken });
        expect(usersService.loginUser).toHaveBeenCalledWith(loginDto);
        });
    });
});