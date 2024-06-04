import { FieldValues } from 'react-hook-form';
import { UI } from '..';
import ChildSeat from '/icons/child-seat.svg';
import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import useOrderForm from '@/hooks/use-order-form';
import { useTranslation } from 'react-i18next';

export interface ChildSeatFormProps {
  form: FieldValues;
  childseatUi: (e?: any) => void;
}

function ChildSeatForm({ form, childseatUi }: ChildSeatFormProps) {
  const { t } = useTranslation();
  const { handleResetChildseats } = useOrderForm(form);
  const [active, setActive] = useState<boolean>(false);

  function createArray(length: number) {
    return Array.from({ length }, (_, index) => index);
  }

  const handleChildseatUi = (payload: boolean) => {
    childseatUi(!payload);
    setActive(!payload);
  };

  useEffect(() => {
    if (!active) {
      handleResetChildseats();
    }
  }, [active]);

  return (
    <div className={`grid gap-4 ${active ? 'md:grid-cols-2' : ''}`}>
      <UI.Card
        onClick={() => handleChildseatUi(active)}
        className={`w-full ${
          active ? 'border-zinc-600 opacity-100' : 'opacity-50'
        } bg-gray-50 rounded-2xl shadow-none relative cursor-pointer transition duration-300 ease-in-out`}
      >
        {active && (
          <div className="absolute right-2 top-2 rounded-full bg-white w-6 h-6 flex items-center justify-center">
            <Check className="w-4" />
          </div>
        )}
        <UI.CardContent>
          <div className="flex justify-center items-center gap-8 py-4">
            <img
              src={ChildSeat}
              className="h-[64px] md:h-[80px] sm:w-full lg:w-9/12 lg:max-w-[220px]"
            />
          </div>
          <UI.CardTitle className="text-center tracking-wide mb-2">
            {t('labelAndPlaceholder.childSeat')}
          </UI.CardTitle>
        </UI.CardContent>
      </UI.Card>
      {active && (
        <div className="flex flex-col justify-between gap-4">
          <UI.FormField
            control={form.control}
            name={'extras.childSeatSm'}
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
                          placeholder={t('labelAndPlaceholder.pickChildSeatSm')}
                        />
                      </UI.SelectTrigger>
                    </UI.FormControl>
                    <UI.SelectContent>
                      {createArray(5).map((el) => {
                        return (
                          <UI.SelectItem key={el} value={el.toString()}>
                            <span>
                              {el} - {t('labelAndPlaceholder.childSeatSm')}
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
          <UI.FormField
            control={form.control}
            name={'extras.childSeatMd'}
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
                          placeholder={t('labelAndPlaceholder.pickChildSeatMd')}
                        />
                      </UI.SelectTrigger>
                    </UI.FormControl>
                    <UI.SelectContent>
                      {createArray(5).map((el) => {
                        return (
                          <UI.SelectItem key={el} value={el.toString()}>
                            <span>
                              {el} - {t('labelAndPlaceholder.childSeatMd')}
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
          <UI.FormField
            control={form.control}
            name={'extras.childSeatLg'}
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
                          placeholder={t('labelAndPlaceholder.pickChildSeatLg')}
                        />
                      </UI.SelectTrigger>
                    </UI.FormControl>
                    <UI.SelectContent>
                      {createArray(5).map((el) => {
                        return (
                          <UI.SelectItem key={el} value={el.toString()}>
                            <span>
                              {el} - {t('labelAndPlaceholder.childSeatLg')}
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

export default ChildSeatForm;
