import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  console.log('Checking if user exists by email');
  const start = Date.now();

  if (await User.isUserExistsByEmail(payload?.email)) {
    console.log(`Email check completed in ${Date.now() - start}ms`);
    throw new AppError(httpStatus.IM_USED, 'Email already exists');
  }

  console.log(`Email check completed in ${Date.now() - start}ms`);

  const result = await User.create(payload);
  console.log('User created successfully');
  return result;
};

const getUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

export const userServices = {
  createUserIntoDB,
  getUsersFromDB,
};
