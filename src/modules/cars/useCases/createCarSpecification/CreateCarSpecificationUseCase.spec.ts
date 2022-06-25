import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import FakeSpecificationsRepository from '@modules/cars/repositories/fakes/FakeSpecificationsRepository';
import { AppError } from '@shared/errors/AppError';
import CreateCarSpecificationUseCase from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let fakeCarsRepository: FakeCarsRepository;
let fakeSpecificationsRepository: FakeSpecificationsRepository;

describe('Create Car Specification', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    fakeSpecificationsRepository = new FakeSpecificationsRepository();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      fakeCarsRepository,
      fakeSpecificationsRepository
    );
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await fakeCarsRepository.create({
      name: 'Car name sample',
      description: 'Description sample',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const specification = await fakeSpecificationsRepository.create({
      name: 'Specification sample',
      description: 'Specification description sample',
    });

    const specifications_id = [specification.id];

    const specifications_cars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specifications_cars).toHaveProperty('specifications');
    expect(specifications_cars.specifications.length).toBe(1);
  });

  it('should not be able to add a new specification to a non-existent car', () => {
    expect(async () => {
      const car_id = '1234';
      const specifications_id = ['98765'];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
