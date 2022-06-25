import dayjs from 'dayjs';

import { AppError } from '@shared/errors/AppError';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import CreateRentalUseCase from './CreateRentalUseCase';
import FakeRentalsRepository from '@modules/rentals/repositories/fakes/FakesRentalsRepository';

let createRentalUseCase: CreateRentalUseCase;
let fakeRentalsRepository: FakeRentalsRepository;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider();
    fakeRentalsRepository = new FakeRentalsRepository();
    createRentalUseCase = new CreateRentalUseCase(
      fakeRentalsRepository,
      dayjsDateProvider
    );
  });

  it('should be able o create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '12345',
      user_id: '4321',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able o create a new rental if there is another opened rent to the same user', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '12345',
        user_id: '4321',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: '12345',
        user_id: '4321',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able o create a new rental if there is another opened rent to the same car', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '12345',
        user_id: '4321',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: '12345',
        user_id: '1234',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able o create a new rental with invalid return time', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '12345',
        user_id: '4321',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
