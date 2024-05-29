import useOrderForm from '@/hooks/use-order-form';
import { UI } from '..';
import { FieldValues } from 'react-hook-form';
import { PlaneLanding, PlaneTakeoff } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface DirectionFormSectionProps {
  form: FieldValues;
}

function DirectionFormSection({ form }: DirectionFormSectionProps) {
  const { t } = useTranslation();
  const { handleDirection, selectedDirection, handleResetFlightInformation } =
    useOrderForm(form);

  const handleDirectionToAirport = () => {
    handleDirection('to-airport');
    handleResetFlightInformation();
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl">{t('headline.direction')}</h2>
      <div className="flex gap-4 justify-between items-center mt-2">
        <UI.Button
          type="button"
          variant={selectedDirection === 'to-airport' ? 'default' : 'outline'}
          size="lg"
          weight="bold"
          className={`w-full flex sm:justify-between ${
            selectedDirection === 'to-airport' ? 'opacity-100' : 'opacity-50'
          }`}
          active={selectedDirection === 'to-airport'}
          onClick={handleDirectionToAirport}
        >
          {t('labelAndPlaceholder.toAirport')}{' '}
          <PlaneTakeoff className="hidden sm:inline-block" />
        </UI.Button>
        <UI.Button
          type="button"
          variant={selectedDirection === 'from-airport' ? 'default' : 'outline'}
          size="lg"
          weight="bold"
          className={`w-full flex sm:justify-between ${
            selectedDirection === 'from-airport' ? 'opacity-100' : 'opacity-50'
          }`}
          active={selectedDirection === 'from-airport'}
          onClick={() => handleDirection('from-airport')}
        >
          {t('labelAndPlaceholder.fromAirport')}
          <PlaneLanding className="hidden sm:inline-block" />
        </UI.Button>
      </div>
      {selectedDirection === 'from-airport' && (
        <UI.FlightInformationSection section="product" form={form} />
      )}
    </div>
  );
}

export default DirectionFormSection;
