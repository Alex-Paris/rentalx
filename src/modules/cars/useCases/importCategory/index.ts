import ImportCategoryUseCase from './ImportCategoryUseCase';
import ImportCategoryController from './ImportCategoryController';

const importCategoryUseCase = new ImportCategoryUseCase();

const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);

export default importCategoryController;
