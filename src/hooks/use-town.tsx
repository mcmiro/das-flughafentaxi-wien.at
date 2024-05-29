import { useState } from 'react';
import { TownModel } from '@/types/town';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { AdditionalaAndTownsModel } from '@/types/additionals';

export const orderAdditionalsAtom = atomWithStorage<any>('additionals', {});

export type DirectionProps = 'to-airport' | 'from-airport';

const useTown = () => {
  const [additionalsAndTowns, setAdditionalsAndTowns] =
    useAtom<AdditionalaAndTownsModel>(orderAdditionalsAtom);
  const [towns, setTowns] = useState<string[]>();
  const [selectedTown, setSelectedTown] = useState<string>();

  const getTownsAndDistricts = async (): Promise<TownModel[]> => {
    const dbData = await fetch(`${import.meta.env.VITE_APP_API_URL}/towns/all`)
      .then((response) => response.json())
      .then((data) => {
        setAdditionalsAndTowns({
          additionals: data.additionals[0],
          towns: data.object,
        });
        return data.object;
      })
      .catch(console.error);
    handleTowns(dbData);

    return dbData;
  };

  const handleTowns = (towns: TownModel[]) => {
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
