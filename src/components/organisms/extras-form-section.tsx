import { UI } from '..';
import ChildSeatForm from '@/components/molecules/child-seat-fields';
import StopoverForm from '@/components/molecules/stopover-fields';
import { FieldValues } from 'react-hook-form';
import { paymentOptions } from '@/constants/payment-options';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { orderFormAtom } from '@/hooks/use-order-form';

export interface ExtrasFormSectionProps {
  form: FieldValues;
}

function ExtrasFormSection({ form }: ExtrasFormSectionProps) {
  const [orderForm] = useAtom<any>(orderFormAtom);
  const { t } = useTranslation();
  useEffect(() => {
    form.setValue('data.paymentMethod', paymentOptions[0].option);
  }, []);

  const paymenOptionTranslation = (index: number) => {
    const option = t(`labelAndPlaceholder.paymentOptions`, {
      returnObjects: true,
    }) as string[];

    return option[index];
  };

  return (
    <>
      <div className="mt-6">
        <h2 className="text-xl">{t('headline.extras')}</h2>
        <div className="grid md:grid-cols-2 gap-8 items-start mt-2">
          <ChildSeatForm form={form} />
          <StopoverForm form={form} />
        </div>
      </div>
      {orderForm?.product?.direction === 'from-airport' && (
        <UI.MeetAndgGreetForm form={form} />
      )}
      <div className="mt-8">
        <h2 className="text-xl">{t('headline.others')}</h2>
        <UI.FormField
          control={form.control}
          name={'data.description'}
          render={({ field }) => (
            <UI.FormItem className="flex flex-col">
              <UI.FormControl>
                <UI.Textarea
                  {...field}
                  placeholder={t('labelAndPlaceholder.message')}
                  className="mt-2"
                />
              </UI.FormControl>
              <UI.FormMessage />
            </UI.FormItem>
          )}
        />
      </div>
      <div className="mt-8">
        {/*<h2 className="text-xl">{t('headline.payment')}</h2>*/}
        <div className="mt-2 w-6/12 md:w-4/12">
          <UI.FormField
            control={form.control}
            name={'data.paymentMethod'}
            render={({ field }) => (
              <UI.FormItem className="flex flex-col">
                <UI.FormControl>
                  <UI.Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <UI.FormControl>
                      <UI.SelectTrigger>
                        <UI.SelectValue
                          defaultValue={field.value}
                          placeholder={t('labelAndPlaceholder.pickPayment')}
                        />
                      </UI.SelectTrigger>
                    </UI.FormControl>
                    <UI.SelectContent>
                      {paymentOptions?.length &&
                        paymentOptions.map((payment, index) => (
                          <UI.SelectItem
                            key={payment.option}
                            value={payment.option}
                          >
                            {paymenOptionTranslation(index)}
                          </UI.SelectItem>
                        ))}
                    </UI.SelectContent>
                  </UI.Select>
                </UI.FormControl>
                <UI.FormMessage />
              </UI.FormItem>
            )}
          />
        </div>
      </div>
    </>
  );
}

export default ExtrasFormSection;
