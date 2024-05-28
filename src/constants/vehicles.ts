import { VehicleModel } from '@/types/vehicle';

import Limo from '/limo.png';
import Kombi from '/kombi.png';
import Van from '/van.png';
import Persons from '/icons/persons.svg';
import Luggage from '/icons/luggage.svg';
import Boardcase from '/icons/boardcase.svg';

const vehicles: VehicleModel[] = [
  {
    type: 'sm',
    title: 'vehicleSm',
    persons: {
      title: '1-3 Personen',
      image: Persons,
    },
    luggage: {
      title: '1-2 Koffer',
      image: Luggage,
    },
    bags: {
      title: '1-2 Handgepäck',
      image: Boardcase,
    },
    image: Limo,
    active: false,
  },
  {
    type: 'md',
    title: 'vehicleMd',
    persons: {
      title: '1-4 Personen',
      image: Persons,
    },
    luggage: {
      title: '1-3 Koffer',
      image: Luggage,
    },
    bags: {
      title: '1-2 Handgepäck',
      image: Boardcase,
    },
    image: Kombi,
    active: false,
  },
  {
    type: 'lg',
    title: 'vehicleLg',
    persons: {
      title: '1-8 Personen',
      image: Persons,
    },
    luggage: {
      title: '1-8 Koffer',
      image: Luggage,
    },
    bags: {
      title: '1-8 Handgepäck',
      image: Boardcase,
    },
    image: Van,
    active: false,
  },
];

export default vehicles;
