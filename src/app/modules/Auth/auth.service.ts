import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import AppError from '../../errors/AppError';
import { createToken } from './auth.utils';
import config from '../../config';

interface IUser {
  _id: string;
  email: string;
  password: string;
  role: string;
}

const promiseWithTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Timeout')), ms);
    promise
      .then((res) => {
        clearTimeout(timeout);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timeout);
        reject(err);
      });
  });
};

const loginUserService = async (payload: TLoginUser) => {
  console.log('Start user lookup');

  // Lookup user
  const user = (await promiseWithTimeout(
    User.findOne({ email: payload.email }, '_id email password role').select('+password').lean(),
    5000,
  )) as IUser | null;

  if (!user) {
    console.log('User not found');
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }
  console.log('User lookup finished');

  // password comparison

  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user.password,
  );

  if (!isPasswordMatched) {
    console.log('Password mismatch');
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match');
  }
  console.log('Password comparison finished');

  // JWT payload
  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
    userId: user._id,
  };

  // making access token
  console.log('Start token creation');
  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_secret_expires as string,
  );
  console.log('Token creation finished');

  // Return the user and access token
  return {
    user,
    accessToken,
  };
};

export const AuthServices = {
  loginUserService,
};
