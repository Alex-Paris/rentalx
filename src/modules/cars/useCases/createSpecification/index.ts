import SpecificationsRepository from '../../repositories/implementations/SpecificationsRepository';
import CreateSpecificationUseCase from './CreateSpecificationUseCase';
import CreateSpecificationsController from './CreateSpecificationsController';

const specificationsRepository = SpecificationsRepository.getInstance();

const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository
);

const createSpecificationsController = new CreateSpecificationsController(
  createSpecificationUseCase
);

export default createSpecificationsController;
