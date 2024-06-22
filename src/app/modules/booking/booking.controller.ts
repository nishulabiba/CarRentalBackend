import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';
import { User } from '../user/user.model';

const createBooking = catchAsync(async (req, res) => {
  const payload = req.body;
  const userEmail = req.user?.userEmail;
  const user = await User.isUserExistsByEmail(userEmail)
  payload.user = user._id
  const result = await BookingServices.createAbookingIntoDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Car booked successfully',
    data: result,
  });
});
const getAllBookings = catchAsync(async (req, res) => {
  const { carId, date } = req.query;

  const result = await BookingServices.getAllBookingsFromDB(
    carId as string,
    date as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const getMyBookings = catchAsync(async (req, res) => {
  const {userId} = req.user;

  const result = await BookingServices.getMyBookingsFromDB(
    userId as string
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'My Bookings retrieved successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getMyBookings
};
