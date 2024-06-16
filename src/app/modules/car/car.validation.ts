import { z } from 'zod';

export const CarZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    color: z.string().min(1, 'Color is required'),
    isElectric: z
      .boolean()
      .refine(
        (val) => val === true || val === false,
        'isElectric must be a boolean',
      ),
    features: z
      .array(z.string())
      .nonempty('Features must contain at least one feature'),
    pricePerHour: z
      .number()
      .positive('Price per hour must be a positive number'),
  }),
});
export const CarValidations = {
  CarZodSchema,
};
