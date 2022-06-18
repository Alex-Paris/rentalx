import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import UsersRepository from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token missing');
  }

  //Bearer 8wq79r8qw7rqw69rwq
  //[0] = Bearer
  //[1] = 8wq79r8qw7rqw69rwq
  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      '71144850f4fb4cc55fc0ee6935badddf'
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new Error('User does not exists!');
    }

    next();
  } catch {
    throw new Error('Invalid token!');
  }
}
