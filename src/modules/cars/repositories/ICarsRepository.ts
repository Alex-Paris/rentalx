import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  findById(id: string): Promise<Car | undefined>;
  findAllAvailables(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]>;
}
