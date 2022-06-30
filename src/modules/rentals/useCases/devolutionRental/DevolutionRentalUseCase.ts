import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import Rental from '@modules/rentals/infra/typeorm/entities/Rentals';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const minimunDaily = 1;
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError('Rental does not exists');
    }

    const car = await this.carsRepository.findById(rental.car_id);

    if (!car) {
      throw new AppError('Rental does not have an existing car');
    }

    let daily = this.dateProvider.compareInDays(
      rental.start_data,
      this.dateProvider.dateNow()
    );

    if (daily <= 0) {
      daily = minimunDaily;
    }

    const delay = this.dateProvider.compareInHours(
      this.dateProvider.dateNow(),
      rental.expected_return_date
    );

    let total = 0;

    if (delay > 0) {
      const calculateFine = delay * car.fine_amount;
      total = calculateFine;
    }

    total += daily * car.daily_rate;

    rental.end_data = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}
