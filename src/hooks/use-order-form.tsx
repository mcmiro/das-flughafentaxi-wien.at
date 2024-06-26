import { useEffect, useState } from 'react';
import { FieldValues, useWatch } from 'react-hook-form';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { format } from 'date-fns';
import defaultValues from '@/lib/default-order-values';

export const orderFormAtom = atomWithStorage<FieldValues>('form', {});

export type DirectionProps = 'to-airport' | 'from-airport';

const useOrderForm = (form: FieldValues) => {
  const [orderForm, setOrderForm] = useAtom(orderFormAtom);
  const [selectedVehicle, setSelectedVehicle] = useState<string>('sm');
  const [selectedDirection, setSelectedDirection] =
    useState<DirectionProps>('to-airport');

  const { control } = form;

  const watchedValues = useWatch({
    control,
  });

  useEffect(() => {
    setOrderForm(watchedValues);
  }, [watchedValues, setOrderForm]);

  const handleVehicle = (vehicle: string) => {
    form.setValue('product.vehicle', vehicle);
    setSelectedVehicle(vehicle);
  };

  const handleDirection = (direction: DirectionProps) => {
    form.setValue('product.direction', direction);
    setSelectedDirection(direction);
  };

  const handleDate = (payload: { date: Date; section: string }) => {
    const formattedDate = format(payload.date, 'dd.MM.yyyy');
    form.setValue(`${payload.section}.date`, formattedDate);
    form.trigger(`${payload.section}.date`);
  };

  const handleTime = (payload: { time: string; section: string }) => {
    form.setValue(`${payload.section}.time`, payload.time);
    form.trigger(`${payload.section}.time`);
  };

  const handleResetFlightInformation = () => {
    form.setValue('product.flightArrivalDirection', '');
    form.setValue('product.flightId', '');
  };

  const handleResetChildseats = () => {
    form.setValue('extras.childSeatSm', '');
    form.setValue('extras.childSeatMd', '');
    form.setValue('extras.childSeatLg', '');
  };

  const handleResetStopover = () => {
    form.setValue('extras.stopover', '');
    form.setValue('extras.stopoverValue', '');
  };

  const handleResetForm = () => {
    form.reset(defaultValues);
    handleResetFlightInformation();
    handleResetChildseats();
    handleResetStopover();
  };

  return {
    handleVehicle,
    handleDirection,
    handleDate,
    handleTime,
    handleResetChildseats,
    handleResetStopover,
    handleResetFlightInformation,
    handleResetForm,
    selectedVehicle,
    selectedDirection,
    orderForm,
  };
};

export default useOrderForm;
