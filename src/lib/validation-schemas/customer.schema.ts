import * as z from 'zod';
import { TFunction } from 'i18next';

export const customerSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(1, { message: t('validation.name') }),
    email: z
      .string()
      .min(1, { message: t('validation.email') })
      .email(t('validation.emailFormat')),
    phone: z.string().min(1, { message: t('validation.phone') }),
    town: z.string().min(1, { message: t('validation.town') }),
    postal_code: z.string().min(1, { message: t('validation.district') }),
    address: z.string().min(1, { message: t('validation.address') }),
    number: z.string().min(1, { message: t('validation.number') }),
  });
