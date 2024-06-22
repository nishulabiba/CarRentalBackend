/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const BookingSchema = new Schema<TBooking>(
  {
    
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, default: null },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    car: { type: Schema.Types.ObjectId, ref: 'Car' },
    carId: { type: Schema.Types.ObjectId, ref: 'Car', required: true, select: false },
    totalCost: { type: Number, default: 0 },
  },
  { timestamps: true },
);


const Booking = model<TBooking>('Booking', BookingSchema);

export { Booking };
