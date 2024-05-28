import { UI } from '..';
import { FieldValues } from 'react-hook-form';
import useOrderForm from '@/hooks/use-order-form';
import { useTranslation } from 'react-i18next';

export interface DateTimeFormSectionProps {
  form: FieldValues;
  section: string;
}

function DateTimeFormSection({ form, section }: DateTimeFormSectionProps) {
  const { handleDate, handleTime } = useOrderForm(form);
  const { t } = useTranslation();

  return (
    <div className="mt-8">
      <h2 className="text-xl">{t('headline.dateTime')}</h2>
      <div className="grid md:grid-cols-2 gap-4 mt-2 md:h-12">
        <UI.FormField
          control={form.control}
          name={`${section}.date`}
          render={() => (
            <UI.FormItem className="flex flex-col">
              <UI.FormControl>
                <UI.DatePicker section={section} onSelect={handleDate} />
              </UI.FormControl>
              <UI.FormMessage />
            </UI.FormItem>
          )}
        />
        <UI.FormField
          control={form.control}
          name={`${section}.time`}
          render={() => (
            <UI.FormItem className="flex flex-col">
              <UI.FormControl>
                <UI.TimePicker section={section} onChange={handleTime} />
              </UI.FormControl>
              <UI.FormMessage />
            </UI.FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default DateTimeFormSection;
