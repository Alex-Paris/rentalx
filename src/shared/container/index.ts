import { container } from 'tsyringe';

import './providers';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationsRepository';
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import CarsRepository from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import CategoriesRepository from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import SpecificationsRepository from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import CarsImagesRepository from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';

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

container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository',
  CarsImagesRepository
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository
);
