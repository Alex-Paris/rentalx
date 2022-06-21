import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { getRepository, Repository } from 'typeorm';
import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({
      license_plate,
    });

    return car;
  }

  async findAllAvailables(
    category_id?: string | undefined,
    brand?: string | undefined,
    name?: string | undefined
  ): Promise<Car[]> {
    return await this.repository
      .createQueryBuilder('c')
      .where('c.available = :available', { available: true })
      .andWhere(
        'c.brand = :brand || c.name = :name || c.category_id = :category_id',
        { brand, name, category_id }
      )
      .getMany();
  }
}

export default CarsRepository;
