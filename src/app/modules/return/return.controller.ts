import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { returnServices } from './return.service';

const returnCar = catchAsync(async (req, res) => {
  const { bookingId, endTime } = req.body;

  const result = await returnServices.returnCarIntoDB(
    bookingId as string,
    endTime as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car returned successfully',
    data: result,
  });
});
export const returncontrollers = { returnCar };
