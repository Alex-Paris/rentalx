import { getRepository, Repository } from 'typeorm';

import User from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  list(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  async create({
    name,
    password,
    email,
    driver_license,
    id,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
      id,
      avatar,
    });

    await this.repository.save(user);
  }
}

export default UsersRepository;
