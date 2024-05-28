import * as z from 'zod';

export const dataSchema = z.object({
  description: z.string().optional(),
  paymentMethod: z.string().optional(),
});
