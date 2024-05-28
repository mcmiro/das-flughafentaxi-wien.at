import { UI } from '@/components';
import { FieldValues } from 'react-hook-form';
import AddressForm from '../molecules/address-fields';
import { useTranslation } from 'react-i18next';

export interface CustomerFormSectionProps {
  form: FieldValues;
}

const CustomerFormSection = ({ form }: CustomerFormSectionProps) => {
  const { t } = useTranslation();
  return (
    <div className="mt-6">
      <h2 className="text-xl">{t('headline.contactAddress')}</h2>
      <div className="grid md:grid-cols-3 gap-4 mt-2 md:h-14">
        <UI.FormField
          control={form.control}
          name={'customer.name'}
          render={({ field }) => (
            <UI.FormItem className="flex flex-col">
              <UI.FormControl>
                <UI.Input
                  {...field}
                  placeholder={t('labelAndPlaceholder.name')}
                />
              </UI.FormControl>
              <UI.FormMessage />
            </UI.FormItem>
          )}
        />
        <UI.FormField
          control={form.control}
          name={'customer.email'}
          render={({ field }) => (
            <UI.FormItem className="flex flex-col">
              <UI.FormControl>
                <UI.Input
                  {...field}
                  placeholder={t('labelAndPlaceholder.email')}
                />
              </UI.FormControl>
              <UI.FormMessage />
            </UI.FormItem>
          )}
        />
        <UI.FormField
          control={form.control}
          name={'customer.phone'}
          render={({ field }) => (
            <UI.FormItem className="flex flex-col">
              <UI.FormControl>
                <UI.Input
                  {...field}
                  placeholder={t('labelAndPlaceholder.phone')}
                />
              </UI.FormControl>
              <UI.FormMessage />
            </UI.FormItem>
          )}
        />
      </div>
      <AddressForm section="customer" form={form} />
    </div>
  );
};

export default CustomerFormSection;
