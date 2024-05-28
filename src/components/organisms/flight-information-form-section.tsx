import { FieldValues } from 'react-hook-form';
import { UI } from '..';
import { useTranslation } from 'react-i18next';

export interface FlightInformationSectionFormProps {
  form: FieldValues;
  section: string;
}

const FlightInformationSection = ({
  form,
  section,
}: FlightInformationSectionFormProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between gap-4 mt-2">
      <div className="w-full">
        <UI.FormField
          control={form.control}
          name={`${section}.flightArrivalDirection`}
          render={({ field }) => (
            <UI.FormItem className="flex flex-col">
              <UI.FormControl>
                <UI.Input
                  {...field}
                  placeholder={t('labelAndPlaceholder.departure')}
                />
              </UI.FormControl>
              <UI.FormMessage />
            </UI.FormItem>
          )}
        />
      </div>
      <div className="w-full">
        <UI.FormField
          control={form.control}
          name={`${section}.flightId`}
          render={({ field }) => (
            <UI.FormItem className="flex flex-col relative">
              <UI.FormControl>
                <UI.Input
                  {...field}
                  placeholder={t('labelAndPlaceholder.flightId')}
                />
              </UI.FormControl>
              <UI.FormMessage />
            </UI.FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default FlightInformationSection;
