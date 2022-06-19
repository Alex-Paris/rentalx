import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import CreateUserUseCase from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let fakeUsersRepository: FakeUsersRepository;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(fakeUsersRepository);
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000123456',
      email: 'johndoe@example.com',
      password: '123456',
      name: 'John Doe',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'johndoe@example.com',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '000123456',
        email: 'johndoe@example.com',
        password: '123456',
        name: 'John Doe',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: 'johndoe@example.com',
        password: '123123',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
