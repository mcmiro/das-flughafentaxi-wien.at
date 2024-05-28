import { FieldValues } from 'react-hook-form';
import { UI } from '..';
import { useTranslation } from 'react-i18next';

export interface CheckConditionsFieldProps {
  form: FieldValues;
}

function CheckConditionsField({ form }: CheckConditionsFieldProps) {
  const { t } = useTranslation();
  return (
    <div className="mt-8">
      <UI.FormField
        control={form.control}
        name="conditions"
        render={({ field }) => (
          <UI.FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <UI.FormControl>
              <UI.Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </UI.FormControl>
            <div className="space-y-1 leading-none">
              <UI.FormLabel className="md:text-md">
                {t('labelAndPlaceholder.legalCheck')}{' '}
                <a href="./agb" target="_blank" className="underline">
                  {t('labelAndPlaceholder.termsAndConditions')}{' '}
                </a>{' '}
                {t('labelAndPlaceholder.and')}{' '}
                <a href="./dsgvo" target="_blank" className="underline">
                  {t('labelAndPlaceholder.dataProtection')}
                </a>
                .
              </UI.FormLabel>
            </div>
          </UI.FormItem>
        )}
      />
    </div>
  );
}

export default CheckConditionsField;
