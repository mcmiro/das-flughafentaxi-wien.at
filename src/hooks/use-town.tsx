import { AdditionalaAndTownsModel } from '@/types/additionals';
import { TownModel } from '@/types/town';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useState } from 'react';

export const orderAdditionalsAtom = atomWithStorage<any>('additionals', {});

export type DirectionProps = 'to-airport' | 'from-airport';

const useTown = () => {
  const [additionalsAndTowns, setAdditionalsAndTowns] =
    useAtom<AdditionalaAndTownsModel>(orderAdditionalsAtom);
  const [towns, setTowns] = useState<string[]>();
  const [selectedTown, setSelectedTown] = useState<string>();

  const getTownsAndDistricts = async (): Promise<TownModel> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/towns/all`
      );
      const data = await response.json();

      // reorder the raw object to have 'Wien' as the first key
      const towns: TownModel = {
        Wien: data.object['Wien'],
        ...Object.fromEntries(
          Object.entries(data.object).filter(([key]) => key !== 'Wien')
        ),
      };

      setAdditionalsAndTowns({
        additionals: data.additionals[0],
        towns: towns,
      });

      handleTowns(towns);
      return towns;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleTowns = (towns: TownModel) => {
    const parsedTowns = Object.keys(towns).map((town) => town);
    setTowns(parsedTowns);
    setSelectedTown(parsedTowns[0]);
  };

  return {
    getTownsAndDistricts,
    towns,
    setSelectedTown,
    selectedTown,
    additionalsAndTowns,
  };
};

export default useTown;
