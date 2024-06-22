import express from 'express';
import validateRequest from '../../middlewares/validate-request';
import { CarValidations } from './car.validation';
import { CarController } from './car.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';
import { returncontrollers } from '../return/return.controller';
import { returnValidations } from '../return/return.validation';

const router = express.Router();

router.put(
  '/return',
  auth(USER_ROLE.admin),
  validateRequest(returnValidations.returnValidationSchema),
  returncontrollers.returnCar,
);
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(CarValidations.CarZodSchema),
  CarController.createCar,
);
router.get('/', CarController.getCars);
router.get('/:id', CarController.getSingleCar);
router.put('/:id', auth(USER_ROLE.admin), CarController.updateCar);
router.delete('/:id', auth(USER_ROLE.admin), CarController.deleteAcar);
export const CarRoute = router;
