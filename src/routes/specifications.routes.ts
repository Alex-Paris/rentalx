import { Router } from 'express';

import CreateSpecificationsController from '../modules/cars/useCases/createSpecification/CreateSpecificationsController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationsController();

specificationsRoutes.post('/', createSpecificationController.handle);

//specificationsRoutes.get('/', (request, response) => {
//const allSpecifications = specificationsRepository.list();
//return response.json(allSpecifications);
//});

export default specificationsRoutes;
