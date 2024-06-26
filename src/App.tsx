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
import { useEffect, useRef, useState } from 'react';
import { ResponseModel } from './types/response';
import useOrderForm from '@/hooks/use-order-form';
import '@iframe-resizer/child';

function App() {
  const { t, i18n } = useTranslation();
  const { lang, changeLanguage } = useI18n();
  const [orderForm] = useAtom<any>(orderFormAtom);
  const [responseContent, setResponseContent] = useState<ResponseModel[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const wasModalOpenRef = useRef<boolean>(false);

  const [formKey, setFormKey] = useState<number>(1);

  const schema = useOrderSchema();
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  });
  const { handleResetForm } = useOrderForm(form);

  const serializeOrderDataForBackend = (formData: FieldValues) => {
    if (!formData.isReturnJourney) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { returnJourney, ...rest } = formData;
      return { ...rest, lang: i18n.language };
    }
    return formData;
  };

  const onSubmit = async (data: OrderFormValues) => {
    const formData = serializeOrderDataForBackend(data);
    setIsLoading(true);
    axios
      .post(`${import.meta.env.VITE_APP_API_URL}/order/create`, formData)
      .then(async (dataRes) => {
        const response = Object.entries(dataRes.data.object).map(
          (booking) => booking[1] as ResponseModel
        );

        if (response) {
          setResponseContent(response);
          setIsModalOpen(true);
          handleResetForm();
          setFormKey(formKey + 1);
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log('Error: ', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!isModalOpen && wasModalOpenRef.current) {
      window.location.reload();
    }
    wasModalOpenRef.current = isModalOpen;
  }, [isModalOpen]);

  useEffect(() => {
    changeLanguage(lang !== null ? lang : 'de');
  }, [lang]);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8 py-16 max-w-[1048px]">
        <UI.Form {...form} key={formKey}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <h1 className="text-3xl">{t('headline.h1')}</h1>
            <UI.VehicleFormSection form={form} />
            <UI.Spacer size="xs" />
            <UI.DirectionFormSection form={form} />
            <UI.Spacer size="xs" />
            <UI.DateTimeFormSection section="product" form={form} />
            <UI.Spacer size="xs" />
            <UI.CustomerFormSection form={form} />
            <UI.Spacer size="xs" />
            <UI.ExtrasFormSection form={form} />
            <UI.Spacer size="xs" />
            <UI.ReturnJourneySwitch form={form} />
            {orderForm?.isReturnJourney && (
              <UI.ReturnJourneySection form={form} />
            )}
            <UI.CheckConditionsField form={form} />
            <UI.PriceSection />
            <UI.Button
              disabled={isLoading}
              size="lg"
              weight="bold"
              className={`ml-auto my-4`}
              type="submit"
            >
              {t('labelAndPlaceholder.submit')}
            </UI.Button>
          </form>
        </UI.Form>
      </div>
      {responseContent && (
        <div>
          <UI.ResponseMessage
            content={responseContent}
            isModalOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </>
  );
}

export default App;
