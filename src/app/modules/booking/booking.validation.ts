import { Types } from "mongoose";
import { z } from "zod";

const objectId = z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId format'
  });
  
  const BookingZodSchema = z.object({
    body: z.object({
        user: objectId.optional(),
        carId: objectId.refine((val) => Types.ObjectId.isValid(val), {
          message: 'Invalid car ObjectId format'
        }),
        date: z.string().refine((val) => !isNaN(Date.parse(val)), {
          message: 'Invalid date format, expected YYYY-MM-DD',
        }),
        startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
          message: 'Invalid time format, expected HH:MM in 24hr format',
        }),
        endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
          message: 'Invalid time format, expected HH:MM in 24hr format',
        }).nullable().optional(),
        totalCost: z.number().default(0).optional(),
      })
  });

  export default BookingZodSchema;