import { Router } from 'express';
import { userRoute } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { CarRoute } from '../modules/car/car.route';
import { BookingRoute } from '../modules/booking/booking.route';
import { returncontrollers } from '../modules/return/return.controller';

const router = Router();

const modulesRoute = [
  {
    path: '/auth',
    route: userRoute,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/cars',
    route: CarRoute,
  },
  {
    path: '/bookings',
    route: BookingRoute,
  },
];

modulesRoute.forEach((route) => router.use(route.path, route.route));
router.put('/cars/return', returncontrollers.returnCar);
export default router;
