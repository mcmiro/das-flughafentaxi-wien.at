import * as z from 'zod';
import getFormData from '@/lib/form-data';
import { TFunction } from 'i18next';

export const returnJourneySchema = (t: TFunction) =>
  z.object({
    flightArrivalDirection: z.string().optional(),
    flightId: z.string().optional(),
    date: z
      .string()
      .optional()
      .transform((value) => value)
      .refine(
        (value) => {
          const formData = getFormData();
          if (formData.isReturnJourney && !value) {
            return false;
          }
          return true;
        },
        {
          message: t('validation.date'),
        }
      ),
    time: z
      .string()
      .optional()
      .transform((value) => value)
      .refine(
        (value) => {
          const formData = getFormData();
          if (formData.isReturnJourney && value === '') {
            return false;
          }
          return true;
        },
        {
          message: t('validation.timeFormat'),
        }
      ),
    isDifferentAddress: z.boolean(),
    differentAddress: z
      .object({
        town: z.string().optional(),
        postal_code: z.string().optional(),
        address: z.string().optional(),
        number: z.string().optional(),
      })
      .superRefine((data, ctx) => {
        const formData = getFormData();
        if (
          formData.isReturnJourney &&
          formData.isDifferentAddress &&
          data?.address === ''
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('validation.address'),
            path: ['address'],
          });
        }
        if (
          formData.isReturnJourney &&
          formData.isDifferentAddress &&
          data?.number === ''
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('validation.number'),
            path: ['number'],
          });
        }
      }),
  });
