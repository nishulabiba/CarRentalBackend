import { TCar } from './car.interface';
import { Schema, model } from 'mongoose';

const CarSchema = new Schema<TCar>(
  {
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    color: { type: String, required: [true, 'Color is required'] },
    isElectric: { type: Boolean, required: [true, 'isElectric is required'] },
    status: {
      type: String,
      enum: ['available', 'unavailable', 'in_maintenance'],
      default: 'available',
    },
    features: { type: [String], required: [true, 'Features are required'] },
    pricePerHour: {
      type: Number,
      required: [true, 'Price per hour is required'],
      min: [0, 'Price per hour must be positive'],
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const Car = model<TCar>('Car', CarSchema);

export default Car;
