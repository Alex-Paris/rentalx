import { getRepository, Repository } from 'typeorm';

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

import UserTokens from '../entities/UserTokens';
import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create(data: ICreateUserTokenDTO): Promise<UserTokens | undefined> {
    const userToken = this.repository.create(data);

    return await this.repository.save(userToken);
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens | undefined> {
    return await this.repository.findOne({
      user_id,
      refresh_token,
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default UsersTokensRepository;
