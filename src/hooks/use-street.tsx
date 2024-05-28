import { useState } from 'react';
import { TownModel } from '@/types/town';
import { StreetModel } from '@/types/street';

export type DirectionProps = 'to-airport' | 'from-airport';

const useStreet = () => {
  const [streetList, setsStreetList] = useState<StreetModel[]>();
  const [streets, setStreets] = useState<StreetModel[]>();
  const [selectedStreet, setSelectedStreet] = useState<StreetModel>({
    id: 0,
    name: '',
    postal_code: '',
  });

  const getStreets = async (postalCode: string): Promise<TownModel[]> => {
    const dbData = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/street/get/${postalCode}`
    )
      .then((response) => response.json())
      .then((data) => {
        setStreets(data.object);
        return data.object;
      })
      .catch(console.error);
    setsStreetList(dbData);
    return dbData;
  };

  const autoCompleteStreets = (value: string) => {
    if (!streetList) return [];

    setStreets(
      streetList.filter((street: StreetModel) =>
        street.name.toLowerCase().startsWith(value.toLowerCase())
      )
    );
  };

  return {
    getStreets,
    streets,
    selectedStreet,
    setSelectedStreet,
    autoCompleteStreets,
  };
};

export default useStreet;
