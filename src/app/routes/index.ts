import { Router } from 'express';
import { userRoute } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { CarRoute } from '../modules/car/car.route';

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
];

modulesRoute.forEach((route) => router.use(route.path, route.route));
export default router;
