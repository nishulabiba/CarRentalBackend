/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Booking } from './booking.model';
import { TBooking } from './booking.interface';
import Car from '../car/car.model';
import { User } from '../user/user.model';

const createAbookingIntoDB = async (payload: TBooking) => {
  payload.car = payload.carId
  const isCarExists = await Car.findById(payload?.carId);
  if (!isCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
  }
  if(isCarExists.status === 'unavailable' || isCarExists.status === 'in_maintenance'){
    throw new AppError(httpStatus.CONFLICT, 'This car is not available.')
  }
  const isUserExists = await User.findById(payload.user);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
  }
  // Create the booking in the database
  const newBooking = await Booking.create(payload);
  if (newBooking) {
    await Car.findByIdAndUpdate(payload.carId, { status: 'unavailable' }).select('-carId');
  }
  
  const populatedBooking: any = await newBooking.populate('user car');
  
  const bookingObj = populatedBooking.toObject();
  delete bookingObj.carId;

  return bookingObj;
};
const getAllBookingsFromDB = async (carId: string, date: string) => {
  const filter: any = {};
  if (carId) {
    filter.car = carId;
  }
  if (date) {
    const parsedDate = new Date(date as string);
    filter.date = parsedDate;
  }
  const bookings = await Booking.find(filter, {_id:true})

  if (!bookings) {
    throw new AppError(httpStatus.NOT_FOUND, 'not found');
  }
  return bookings;
};

const getMyBookingsFromDB = async (userId: string) => {
  const bookings = await Booking.find({user: userId}).populate('car user').select('-carId')

  if (!bookings) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cars not found');
  }
  
  return bookings;
};
export const BookingServices = {
  getAllBookingsFromDB,
  createAbookingIntoDB,
  getMyBookingsFromDB
};
