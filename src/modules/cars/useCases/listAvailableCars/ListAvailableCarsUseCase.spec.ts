import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import ListAvailableCarsUseCase from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let fakeCarsRepository: FakeCarsRepository;

describe('List cars', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(fakeCarsRepository);
  });

  it('should be able to list all available cars', async () => {
    const car = await fakeCarsRepository.create({
      name: 'Sample car',
      description: 'Sample description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 40,
      brand: 'Brand sample',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await fakeCarsRepository.create({
      name: 'Sample car',
      description: 'Sample description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 40,
      brand: 'Brand sample',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({ name: car.name });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await fakeCarsRepository.create({
      name: 'Sample car',
      description: 'Sample description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 40,
      brand: 'Brand sample',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: car.brand });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await fakeCarsRepository.create({
      name: 'Sample car',
      description: 'Sample description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 40,
      brand: 'Brand sample',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: car.category_id,
    });

    expect(cars).toEqual([car]);
  });
});
