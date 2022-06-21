import { container } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationsRepository';
import CarsRepository from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import CategoriesRepository from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import SpecificationsRepository from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);
