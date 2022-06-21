import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import { AppError } from '@shared/errors/AppError';
import CreateCarUseCase from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let fakeCarsRepository: FakeCarsRepository;

describe('Create Car', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    createCarUseCase = new CreateCarUseCase(fakeCarsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car name sample',
      description: 'Description sample',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with same license plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car name sample',
        description: 'Description sample',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
      });

      await createCarUseCase.execute({
        name: 'Car2 name sample',
        description: 'Description sample',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should new created car be available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car name sample',
      description: 'Description sample',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
