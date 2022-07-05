import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  list(): Promise<User[]>;
  create(data: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
