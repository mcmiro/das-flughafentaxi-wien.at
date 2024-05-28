import * as z from 'zod';
import { TFunction } from 'i18next';

export const conditionsSchema = (t: TFunction) =>
  z.boolean().refine((value) => value === true, {
    message: t('validation.conditions'),
  });
