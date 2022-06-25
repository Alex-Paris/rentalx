import { Router } from 'express';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import CreateCarController from '@modules/cars/useCases/createCar/CreateCarController';
import CreateCarSpecificationController from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import ListAvailableCarsControllers from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsControllers';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsControllers = new ListAvailableCarsControllers();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get('/available', listAvailableCarsControllers.handle);

carsRoutes.get('/specifications/:id', createCarSpecificationController.handle);

export default carsRoutes;
