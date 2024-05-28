import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { productSchema } from './validation-schemas/product-schema';
import { extrasSchema } from './validation-schemas/extras-schema';
import { customerSchema } from './validation-schemas/customer.schema';
import { returnJourneySchema } from './validation-schemas/return-journey-schema';
import { dataSchema } from './validation-schemas/data-schema';
import { conditionsSchema } from './validation-schemas/conditions-schema';

export const useOrderSchema = () => {
  const { t } = useTranslation();

  return z.object({
    product: productSchema(t),
    extras: extrasSchema,
    customer: customerSchema(t),
    data: dataSchema,
    isReturnJourney: z.boolean().optional(),
    returnJourney: returnJourneySchema(t),
    conditions: conditionsSchema(t),
  });
};

export type OrderFormValues = z.infer<ReturnType<typeof useOrderSchema>>;
