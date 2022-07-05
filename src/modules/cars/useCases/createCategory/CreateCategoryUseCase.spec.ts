import { AppError } from '@errors/AppError';
import FakeCategoriesRepository from '../../repositories/fakes/FakeCategoriesRepository';
import CreateCategoryUseCase from './CreateCategoryUseCase';

let fakeCategoriesRepository: FakeCategoriesRepository;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create Category', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(fakeCategoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description test',
    };

    await createCategoryUseCase.execute(category);

    const createdCategory = await fakeCategoriesRepository.findByName(
      category.name
    );

    expect(createdCategory).toHaveProperty('id');
  });

  it('should not be able to create a new category with same name', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description test',
    };

    await createCategoryUseCase.execute(category);

    await expect(createCategoryUseCase.execute(category)).rejects.toEqual(
      new AppError('Category already exists!')
    );
  });
});
