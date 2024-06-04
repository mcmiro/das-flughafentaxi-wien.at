import { UI } from '..';
import { useAtom } from 'jotai';
import { orderFormAtom } from '@/hooks/use-order-form';
import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface ReturnJourneySectionProps {
  form: FieldValues;
}

function ReturnJourneySection({ form }: ReturnJourneySectionProps) {
  const { t } = useTranslation();
  const [orderForm] = useAtom<any>(orderFormAtom);
  return (
    <div>
      <div className="mt-4">
        <UI.DateTimeFormSection section="returnJourney" form={form} />
        <div className="mt-4">
          {orderForm?.product?.direction === 'to-airport' && (
            <>
              <h2 className="text-xl">{t('headline.flightInformations')}</h2>
              <UI.FlightInformationSection
                section="returnJourney"
                form={form}
              />
            </>
          )}
        </div>
        {orderForm?.product?.direction === 'to-airport' && (
          <UI.MeetAndgGreetForm form={form} />
        )}
        <UI.DifferentAddressSwitch form={form} />
      </div>
    </div>
  );
}

export default ReturnJourneySection;
