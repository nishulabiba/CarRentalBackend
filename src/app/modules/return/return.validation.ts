import { z } from 'zod';

const returnValidationSchema = z.object({
  body: z.object({
    bookingId: z.string(),
    endTime: z
      .string()
      .refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
        message: 'Invalid time format',
      }),
  }),
});

export const returnValidations = {
  returnValidationSchema,
};
