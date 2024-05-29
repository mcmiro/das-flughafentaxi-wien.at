import { FieldValues } from 'react-hook-form';
import vehicles from '@/constants/vehicles';
import { VehicleModel } from '@/types/vehicle';
import { UI } from '..';
import useOrderForm from '@/hooks/use-order-form';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export interface VehicleFormSectionProps {
  form: FieldValues;
}

function VehicleFormSection({ form }: VehicleFormSectionProps) {
  const { t } = useTranslation();
  const { handleVehicle, selectedVehicle } = useOrderForm(form);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const vehicleGet = urlParams.get('vehicle');

  //Handle vehicle
  useEffect(() => {
    const selectedVehicle = vehicles?.find(
      (vehicle: VehicleModel) => vehicle.type === vehicleGet
    )?.type;
    handleVehicle(selectedVehicle !== undefined ? selectedVehicle : 'sm');
  }, [vehicleGet]);

  return (
    <div className="mt-8">
      <h2 className="text-xl">{t('headline.vehicle')}</h2>
      <div className="grid sm:grid-cols-3 gap-4 sm:justify-between items-center">
        {vehicles?.length &&
          vehicles.map((vehicle: VehicleModel, index: number) => (
            <div key={index} onClick={() => handleVehicle(vehicle.type)}>
              <UI.VehicleCard
                index={index}
                item={vehicle}
                active={selectedVehicle === vehicle.type}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default VehicleFormSection;
