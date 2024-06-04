import * as z from 'zod';
import getFormData from '@/lib/form-data';
import { TFunction } from 'i18next';

export const productSchema = (t: TFunction) =>
  z.object({
    vehicle: z.string({ message: t('validation.vehicle') }),
    date: z.string({ message: t('validation.date') }),
    time: z
      .string({ message: t('validation.timeFormat') })
      .min(1, { message: t('validation.time') }),
    direction: z.string(),
    flightArrivalDirection: z
      .string()
      .optional()
      .refine(
        (value) => {
          const formData = getFormData();
          return !(formData?.product?.direction === 'from-airport' && !value);
        },
        { message: t('validation.flightArrivalDirection') }
      ),
    flightId: z
      .string()
      .optional()
      .refine(
        (value) => {
          const formData = getFormData();
          return !(formData?.product?.direction === 'from-airport' && !value);
        },
        { message: t('validation.flightId') }
      ),
  });
