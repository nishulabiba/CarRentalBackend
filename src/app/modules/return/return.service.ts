/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Booking } from '../booking/booking.model';
import Car from '../car/car.model';
import { TCar } from '../car/car.interface';

const returnCarIntoDB = async (bookingId: string, endTime: string) => {
  const booking = await Booking.findById(bookingId).populate('user car');
  // if(booking?.totalCost){
  //   throw new AppError(httpStatus.NOT_FOUND, "This booking is already closed!");

  // }
  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  
  const c:TCar | null = await Car.findByIdAndUpdate(booking?.carId, { status: 'available' });

  const { startTime } = booking;
  const pricePerHour = c?.pricePerHour;

  if (!startTime || !endTime) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid Time input!');
  }
  const [endHour, endMinute] = endTime?.split(':').map(Number);
  const [startHour, startMinute] = startTime?.split(':').map(Number);

  const startTimeInHours = startHour + startMinute / 60;
  const endTimeInHours = endHour + endMinute / 60;
  let durationInHours = endTimeInHours - startTimeInHours;
  if (durationInHours < 0) {
    durationInHours += 24; // Assuming a full day transition if endTime < startTime
  }
  if(!pricePerHour){
    throw new AppError(httpStatus.NOT_FOUND, 'car is invalid')
  }
  const totalCost = durationInHours * pricePerHour;
  booking.totalCost = totalCost;
  booking.endTime = endTime;
  const updatebooking = await booking.save();

  return updatebooking;
};

export const returnServices = { returnCarIntoDB };
