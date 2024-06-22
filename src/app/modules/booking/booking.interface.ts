import { Types } from "mongoose";

export interface TBooking {
    
    date: Date;
    startTime?: string;
    endTime?: string | null;
    car?: Types.ObjectId;
    user?: Types.ObjectId;
    carId: Types.ObjectId;
    totalCost?: number;
  }