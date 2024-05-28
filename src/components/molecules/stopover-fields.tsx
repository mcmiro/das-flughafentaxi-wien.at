import { FieldValues } from 'react-hook-form';
import { UI } from '..';
import StopOver from '/icons/stopover.svg';
import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import useOrderForm from '@/hooks/use-order-form';
import { useTranslation } from 'react-i18next';
import usePrice from '@/hooks/use-price';

export interface StopoverFormProps {
  form: FieldValues;
}

function StopoverForm({ form }: StopoverFormProps) {
  const { t } = useTranslation();
  const { handleResetStopover } = useOrderForm(form);
  const { handlePriceStopover } = usePrice();
  const [active, setActive] = useState<boolean>(false);

  function createArray(length: number) {
    return Array.from({ length }, (_, index) => index);
  }

  useEffect(() => {
    if (!active) {
      handleResetStopover();
    }
  }, [active]);

  return (
    <div className={`grid gap-4 h-full ${active ? 'md:grid-cols-2' : ''}`}>
      <UI.Card
        onClick={() => setActive(!active)}
        className={`w-full ${
          active ? 'border-zinc-600 opacity-100' : 'opacity-50'
        } bg-gray-50 rounded-2xl shadow-none relative cursor-pointer transition duration-300 ease-in-out`}
      >
        {active && (
          <div className="absolute right-2 top-2 rounded-full bg-white w-6 h-6 flex items-center justify-center">
            <Check className="w-4" />
          </div>
        )}
        <UI.CardContent className="flex flex-col justify-between h-full">
          <div className="flex justify-center items-center gap-8 pt-4 md:pt-8 pb-4">
            <img src={StopOver} className="max-w-[140px] sm:w-full" />
          </div>
          <UI.CardTitle className="text-center tracking-wide mb-2">
            {t('labelAndPlaceholder.stopover')}
          </UI.CardTitle>
        </UI.CardContent>
      </UI.Card>
      {active && (
        <div className="">
          <UI.FormField
            control={form.control}
            name={'extras.stopoverValue'}
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
                          placeholder={t('labelAndPlaceholder.pickStopover')}
                        />
                      </UI.SelectTrigger>
                    </UI.FormControl>
                    <UI.SelectContent>
                      {createArray(5).map((el, index: number) => {
                        return (
                          <UI.SelectItem key={el} value={el.toString()}>
                            <span>
                              {el} - {t('labelAndPlaceholder.stopover')}
                              {el > 1 && <span>s</span>} (€
                              {index * handlePriceStopover()}
                              ,-)
                            </span>
                          </UI.SelectItem>
                        );
                      })}
                    </UI.SelectContent>
                  </UI.Select>
                </UI.FormControl>
                <UI.FormMessage />
              </UI.FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
}

export default StopoverForm;
