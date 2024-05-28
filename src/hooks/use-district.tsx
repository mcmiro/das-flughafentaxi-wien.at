import { useState } from 'react';
import { TownModelProps } from '@/types/town';

export type DirectionProps = 'to-airport' | 'from-airport';

const useDistrict = (rawDbData: any) => {
  const [districts, setDistricts] = useState<TownModelProps[]>();
  const [selectedDistrict, setSelectedDistrict] = useState<TownModelProps>();

  const handleDistricts = (town: string) => {
    const parsedDistricts = Object.keys(rawDbData)
      .map((key) => {
        const value = rawDbData[key];
        if (key === town) {
          return value;
        }
        return;
      })
      .filter((districts) => districts !== undefined)
      .flat();
    setDistricts(parsedDistricts);

    return parsedDistricts;
  };

  const filterDistricts = (selectedTown: string, value: string) => {
    const districtsList = handleDistricts(selectedTown);
    const district: TownModelProps[] = districtsList.filter(
      (el: TownModelProps) => el.postal_code === value
    );
    setSelectedDistrict(district[0]);
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
