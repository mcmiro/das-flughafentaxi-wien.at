import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { orderFormAtom } from '@/hooks/use-order-form';
import { orderAdditionalsAtom } from '@/hooks/use-town';
import { TownModelProps } from '@/types/town';
import { AdditionalaAndTownsModel } from '@/types/additionals';
import { FieldValues } from 'react-hook-form';
import { DirectionModel } from '@/types/direction';

const usePrice = () => {
  const [orderForm] = useAtom<FieldValues>(orderFormAtom);
  const [additionalsAndTowns] =
    useAtom<AdditionalaAndTownsModel>(orderAdditionalsAtom);
  const [priceToAirport, setPriceToAirport] = useState<number>(0);
  const [priceFromAirport, setPriceFromAirport] = useState<number>(0);

  useEffect(() => {
    if (orderForm && Object.keys(orderForm).length > 0) {
      handleTotalPrice();
    }
  }, [orderForm]);

  const handlePriceStopover = (): number => {
    switch (orderForm.product.vehicle!) {
      case 'sm':
        return additionalsAndTowns?.additionals?.additional_address_sm;
      case 'md':
        return additionalsAndTowns?.additionals?.additional_address_md;
      case 'lg':
        return additionalsAndTowns?.additionals?.additional_address_lg;
      default:
        return 0;
    }
  };

  const handleTotalPrice = async () => {
    const {
      product: { direction },
      customer: { town, postal_code },
      isReturnJourney,
      returnJourney: {
        isDifferentAddress,
        differentAddress: { town: returnTown, postal_code: returnPostal_code },
      },
    } = orderForm;

    const returnJourneyDirection =
      direction === 'to-airport' ? 'from-airport' : 'to-airport';

    //handle one way
    const price = await handlePriceOneDirection(town, postal_code, direction);

    if (direction === 'to-airport') {
      setPriceToAirport(price);
      setPriceFromAirport(0);
    } else {
      setPriceFromAirport(price);
      setPriceToAirport(0);
    }

    //handle return Journey
    if (isReturnJourney) {
      const price = await handlePriceOneDirection(
        !isDifferentAddress ? town : returnTown,
        !isDifferentAddress ? postal_code : returnPostal_code,
        returnJourneyDirection
      );

      if (returnJourneyDirection === 'to-airport') {
        setPriceToAirport(price);
      } else {
        setPriceFromAirport(price);
      }
    }
  };

  const handlePriceOneDirection = async (
    town: string,
    postal_code: string,
    direction: DirectionModel
  ): Promise<number> => {
    const priceVehicle = await handlePriceVehicle(town, postal_code);
    const priceExtras = await handlePriceForExtras(direction);

    const price = priceVehicle + priceExtras;
    return price;
  };

  const handlePriceForExtras = (direction: DirectionModel): number => {
    const {
      extras: { stopoverValue, meetAndGreet },
    } = orderForm;

    const priceMeetAndGreet =
      meetAndGreet && direction === 'from-airport'
        ? additionalsAndTowns.additionals.meet_and_greet
        : 0;

    const priceStopover = stopoverValue * handlePriceStopover();
    const price = priceMeetAndGreet + priceStopover;

    return price;
  };

  const handlePriceVehicle = (town: string, postal_code: string): number => {
    const vehicle = orderForm.product.vehicle;

    const districts = additionalsAndTowns.towns[town];
    if (!districts) {
      return 0;
    }
    const district = districts.find(
      (district: TownModelProps) => district.postal_code === postal_code
    );
    if (!district) {
      return 0;
    }

    const price = district[vehicle as keyof TownModelProps] as number;
    return price ?? 0;
  };

  const formatter = new Intl.NumberFormat('de-AT', {
    style: 'currency',
    currency: 'EUR',
  });

  const getTotal = () => {
    return {
      priceToAirport: formatter.format(priceToAirport),
      priceFromAirport: formatter.format(priceFromAirport),
    };
  };

  return {
    getTotal,
    handlePriceStopover,
    priceToAirport,
    priceFromAirport,
    formatter,
  };
};

export default usePrice;
