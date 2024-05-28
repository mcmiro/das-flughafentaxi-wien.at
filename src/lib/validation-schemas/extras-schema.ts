import * as z from 'zod';

export const extrasSchema = z.object({
  childSeatSm: z.string().optional(),
  childSeatMd: z.string().optional(),
  childSeatLg: z.string().optional(),
  stopoverValue: z.string().optional(),
  meetAndGreet: z.boolean().optional(),
});
