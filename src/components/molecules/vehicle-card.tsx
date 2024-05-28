import { UI } from '..';
import { VehicleModel, VehiclePropertiesModel } from '@/types/vehicle';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export type VehicleCardProps = {
  index: number;
  item: VehicleModel;
  active: boolean;
};

export type VehiclePropertiesModelProps = {
  index: number;
  item: VehiclePropertiesModel;
  name: string;
};

const IconItem = ({ index, item, name }: VehiclePropertiesModelProps) => {
  const { t } = useTranslation();

  const titleTranslation = t(`labelAndPlaceholder.${name}`, {
    returnObjects: true,
  }) as string[];

  return (
    <div className="flex flex-col justify-center items-center gap-1 md:gap-2 rounded-2xl bg-white w-1/3 lg:p-2 whitespace-nowrap">
      <img src={item.image} className="h-[25px] md:h-[35px]" />
      <p className="text-[10px] font-bold text-center mt-1 md:mt-0">
        <span className="block sm:hidden lg:block">
          {titleTranslation[index]}
        </span>
        <span className="hidden sm:block lg:hidden px-4 pb-2 leading-[12px]">
          {titleTranslation[index].split(' ')[0]}
        </span>
      </p>
    </div>
  );
};

export function VehicleCard({ index, item, active }: VehicleCardProps) {
  const { t } = useTranslation();
  return (
    <UI.Card
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
        <div className="flex sm:justify-center items-center gap-8 py-2 sm:pt-4 sm:pb-4">
          <img
            src={item.image}
            className="max-w-[160px] sm:w-full lg:w-9/12 lg:max-w-[220px]"
          />
          <UI.CardTitle className="sm:hidden sm:text-center tracking-wide">
            {t(`labelAndPlaceholder.${item.title}`)}
          </UI.CardTitle>
        </div>
        <UI.CardTitle className="hidden sm:block sm:text-center tracking-wide">
          {t(`labelAndPlaceholder.${item.title}`)}
        </UI.CardTitle>
        <div
          className={`gap-2 md:gap-4 justify-between h-[55px] md:h-[75px] mt-2 ${
            active ? 'flex' : 'hidden sm:flex'
          }`}
        >
          <IconItem item={item.bags} name="bags" index={index} />
          <IconItem item={item.luggage} name="luggage" index={index} />
          <IconItem item={item.persons} name="persons" index={index} />
        </div>
      </UI.CardContent>
    </UI.Card>
  );
}
