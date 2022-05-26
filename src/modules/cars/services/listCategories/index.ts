import CategoriesRepository from '../../repositories/CategoriesRepository';
import ListCategoriesService from './ListCategoriesService';
import ListCategoriesController from './ListCategoriesController';

const categoriesRepository = CategoriesRepository.getInstance();

const listCategoriesService = new ListCategoriesService(categoriesRepository);

const listCategoriesController = new ListCategoriesController(
  listCategoriesService
);

export default listCategoriesController;
