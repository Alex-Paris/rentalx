import { Router } from 'express';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import uploadConfig from '@config/upload';
import CreateCarController from '@modules/cars/useCases/createCar/CreateCarController';
import CreateCarSpecificationController from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import ListAvailableCarsControllers from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsControllers';
import UploadCarImagesController from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';
import multer from 'multer';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const uploadCarImagesController = new UploadCarImagesController();
const listAvailableCarsControllers = new ListAvailableCarsControllers();
const createCarSpecificationController = new CreateCarSpecificationController();

const upload = multer(uploadConfig.upload('./tmp/cars'));

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.post(
  '/images:id',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImagesController.handle
);

carsRoutes.get('/available', listAvailableCarsControllers.handle);

carsRoutes.get('/specifications/:id', createCarSpecificationController.handle);

export default carsRoutes;
