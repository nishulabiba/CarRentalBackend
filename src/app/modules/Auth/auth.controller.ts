import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthSevices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const user = await AuthSevices.loginUserService(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: user.user,
    token: user.accessToken,
  });
});

export const AuthControllers = {
  loginUser,
};
