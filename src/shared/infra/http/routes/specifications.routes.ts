import { Router } from 'express';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import CreateSpecificationsController from '@modules/cars/useCases/createSpecification/CreateSpecificationsController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationsController();

//specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

//specificationsRoutes.get('/', (request, response) => {
//const allSpecifications = specificationsRepository.list();
//return response.json(allSpecifications);
//});

export default specificationsRoutes;
