import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import Rental from '../infra/typeorm/entities/Rentals';

interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental | undefined>;
  findOpenRentalByUser(user_id: string): Promise<Rental | undefined>;
}

export default IRentalsRepository;
