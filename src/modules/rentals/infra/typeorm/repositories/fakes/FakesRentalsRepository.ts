import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import Rental from '../../entities/Rentals';
import IRentalsRepository from '../IRentalsRepository';

class FakeRentalsRepository implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
    return this.rentals.find(
      rental => rental.car_id === car_id && !rental.end_data
    );
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
    return this.rentals.find(
      rental => rental.user_id === user_id && !rental.end_data
    );
  }
}

export default FakeRentalsRepository;
