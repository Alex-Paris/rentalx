import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import Rental from '../entities/Rentals';

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findById(id: string): Promise<Rental | undefined> {
    return await this.repository.findOne(id);
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data);

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
    return await this.repository.findOne({
      where: { car_id, end_data: null },
    });
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
    return await this.repository.findOne({
      where: { user_id, end_data: null },
    });
  }
}
