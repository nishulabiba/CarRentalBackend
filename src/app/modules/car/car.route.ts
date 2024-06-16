import express from 'express'
import validateRequest from '../../middlewares/validate-request';
import { CarValidations } from './car.validation';
import { CarController } from './car.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';

const router = express.Router();

router.post(
  '/', auth(USER_ROLE.admin),
  validateRequest(CarValidations.CarZodSchema),
  CarController.createCar
); 
router.get(
  '/',
  CarController.getCars
);
router.get(
  '/:id',
  CarController.getSingleCar
);
router.put(
  '/:id', auth(USER_ROLE.admin),
  CarController.updateCar
);
export const CarRoute = router;