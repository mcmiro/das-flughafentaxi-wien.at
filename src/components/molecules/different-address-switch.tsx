import { UI } from '..';
import { FieldValues } from 'react-hook-form';
import { useAtom } from 'jotai';
import { orderFormAtom } from '@/hooks/use-order-form';
import { useTranslation } from 'react-i18next';

export interface DifferentAddressSwitchProps {
  form: FieldValues;
}

function DifferentAddressSwitch({ form }: DifferentAddressSwitchProps) {
  const { t } = useTranslation();
  const [orderForm] = useAtom<any>(orderFormAtom);
  return (
    <div>
      <div className="mt-8 md:w-4/12">
        <UI.FormField
          control={form.control}
          name="returnJourney.isDifferentAddress"
          render={({ field }) => (
            <UI.FormItem className="flex flex-row items-center justify-between rounded-lg border py-2 px-3">
              <div className="space-y-0.5">
                <UI.FormLabel className="cursor-pointer font-semibold">
                  {t('headline.differentAddress')}
                </UI.FormLabel>
              </div>
              <UI.FormControl>
                <UI.Switch
                  className="!mt-0"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </UI.FormControl>
            </UI.FormItem>
          )}
        />
      </div>
      {orderForm.returnJourney.isDifferentAddress && (
        <div className="mt-4">
          <h2 className="text-xl">
            {t('labelAndPlaceholder.differentAddress')}
          </h2>
          <UI.AddressForm
            section="returnJourney.differentAddress"
            form={form}
          />
        </div>
      )}
    </div>
  );
}

export default DifferentAddressSwitch;
