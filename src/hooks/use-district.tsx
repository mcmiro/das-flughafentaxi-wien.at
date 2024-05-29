import { useState } from 'react';
import { TownModelProps } from '@/types/town';
import { useAtom } from 'jotai';
import { orderAdditionalsAtom } from './use-town';

export type DirectionProps = 'to-airport' | 'from-airport';

const useDistrict = () => {
  const [orderAdditionals] = useAtom(orderAdditionalsAtom);
  const [districts, setDistricts] = useState<TownModelProps[]>([]);
  const [selectedDistrict, setSelectedDistrict] =
    useState<TownModelProps | null>(null);

  const handleDistricts = (town: string) => {
    if (!orderAdditionals.towns) return [];

    const parsedDistricts = Object.keys(orderAdditionals.towns)
      .map((key) => {
        const value = orderAdditionals.towns[key];
        if (key === town) {
          return value;
        }
        return undefined;
      })
      .filter((districts) => districts !== undefined)
      .flat();

    setDistricts(parsedDistricts);
    return parsedDistricts;
  };

  const filterDistricts = (selectedTown: string, value: string) => {
    if (!orderAdditionals.towns) return;

    const districtsList = handleDistricts(selectedTown);
    const district = districtsList.filter(
      (el: TownModelProps) => el.postal_code === value
    );

    setSelectedDistrict(district[0] || null);
  };

  return {
    handleDistricts,
    districts,
    setSelectedDistrict,
    selectedDistrict,
    filterDistricts,
  };
};

export default useDistrict;
