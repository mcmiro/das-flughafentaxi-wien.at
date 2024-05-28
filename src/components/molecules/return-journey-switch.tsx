import { UI } from '..';
import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface ReturnJourneySwitchProps {
  form: FieldValues;
}

function ReturnJourneySwitch({ form }: ReturnJourneySwitchProps) {
  const { t } = useTranslation();
  return (
    <div className="mt-8 md:w-4/12">
      <UI.FormField
        control={form.control}
        name="isReturnJourney"
        render={({ field }) => (
          <UI.FormItem className="flex flex-row items-center justify-between rounded-lg border py-2 px-3">
            <div className="space-y-0.5">
              <UI.FormLabel className="cursor-pointer font-semibold">
                {t('labelAndPlaceholder.returnJourney')}
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
  );
}

export default ReturnJourneySwitch;
