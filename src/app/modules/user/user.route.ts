
import validateRequest from "../../middlewares/validate-request";
import { userController } from "./user.controller";
import { UserZodSchema } from "./user.validation";
import express from 'express'

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserZodSchema),
  userController.createUser
); 
router.get(
  '/users',
  userController.getUsers
);
export const userRoute = router;