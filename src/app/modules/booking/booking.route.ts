import express from 'express'
import BookingZodSchema from './booking.validation';
import { BookingControllers } from './booking.controller';
import validateRequest from '../../middlewares/validate-request';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';

const router = express.Router();

router.post(
  '/', auth(USER_ROLE.user),
  validateRequest(BookingZodSchema),
  BookingControllers.createBooking
); 
router.get(
  '/', auth(USER_ROLE.admin),
  BookingControllers.getAllBookings
);
router.get(
  '/my-bookings', auth(USER_ROLE.user),
  BookingControllers.getMyBookings
); 

export const BookingRoute = router;