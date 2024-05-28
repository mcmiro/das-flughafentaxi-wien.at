import { UI } from '@/components';
import { useOrderSchema, type OrderFormValues } from '@/lib/form-schema-order';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import defaultValues from '@/lib/default-order-values';
import axios from 'axios';
import { useAtom } from 'jotai';
import { orderFormAtom } from '@/hooks/use-order-form';
import { useTranslation } from 'react-i18next';
import useI18n from './hooks/use-translation';
import { useEffect, useState } from 'react';
import { ResponseModel } from './types/response';

function App() {
  const { t } = useTranslation();
  const { lang, changeLanguage } = useI18n();
  const [orderForm] = useAtom<any>(orderFormAtom);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [responseContent, setResponseContent] = useState<ResponseModel[]>();

  const schema = useOrderSchema();
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  });

  const serializeOrderDataForBackend = (formData: FieldValues) => {
    if (!formData.isReturnJourney) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { returnJourney, ...rest } = formData;
      return { ...rest };
    }
    return formData;
  };

  const onSubmit = async (data: OrderFormValues) => {
    const formData = serializeOrderDataForBackend(data);
    axios
      .post(`${import.meta.env.VITE_APP_API_URL}/order/create`, formData)
      .then(async (dataRes) => {
        const response = Object.entries(dataRes.data.object).map(
          (booking) => booking[1] as ResponseModel
        );

        if (response) {
          setResponseContent(response);
          setIsModalOpen(true);
        }
      })
      .catch(function (error) {
        console.log('Error: ', error);
      });
  };

  useEffect(() => {
    changeLanguage(lang !== null ? lang : 'de');
  }, [lang]);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8 py-16 max-w-[1048px]">
        <UI.Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <h1 className="text-3xl">{t('headline.h1')}</h1>
            <UI.VehicleFormSection form={form} />
            <UI.DirectionFormSection form={form} />
            <UI.DateTimeFormSection section="product" form={form} />
            <UI.CustomerFormSection form={form} />
            <UI.ExtrasFormSection form={form} />
            <UI.ReturnJourneySwitch form={form} />
            {orderForm?.isReturnJourney && (
              <UI.ReturnJourneySection form={form} />
            )}
            <UI.CheckConditionsField form={form} />
            <UI.PriceSection />
            <UI.Button className="ml-auto mt-4 mb-64" type="submit">
              {t('labelAndPlaceholder.submit')}
            </UI.Button>
          </form>
        </UI.Form>
      </div>
      {responseContent && (
        <UI.ResponseMessage
          content={responseContent}
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default App;
