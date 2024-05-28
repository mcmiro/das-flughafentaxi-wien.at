'use client';
import { UI } from '..';
import { TimerIcon } from 'lucide-react';
import { Plus } from 'lucide-react';
import { Minus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type TimePickerProps = {
  section: string;
  onChange: (payload: { time: string; section: string }) => void;
};

export function TimePicker({ section, onChange }: TimePickerProps) {
  const { t } = useTranslation();
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [time, setTime] = useState<string>('');

  const handleHours = (increase: boolean) => {
    const newHours = increase ? (hours + 1) % 24 : (hours + 23) % 24;
    setHours(newHours);
  };

  const handleMinutes = (increase: boolean) => {
    const newMinutes = increase ? (minutes + 5) % 60 : (minutes + 60 - 5) % 60;
    setMinutes(newMinutes);
  };

  const handleTime = () => {
    const newTime =
      (hours < 10 ? '0' + hours.toString() : hours.toString()) +
      ':' +
      (minutes < 10 ? '0' + minutes.toString() : minutes.toString());
    setTime(newTime);
  };

  useEffect(() => {
    hours && handleTime();
    minutes && handleTime();
  }, [hours, minutes]);

  useEffect(() => {
    time && onChange({ time, section });
  }, [time]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            time === '' && 'text-muted-foreground'
          )}
        >
          <TimerIcon className="mr-2 h-4 w-4" />
          <span>{time === '' ? t('labelAndPlaceholder.pickTime') : time}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full px-4 py-2 flex items-center gap-4"
        align="start"
      >
        <div className="overflow-y-auto cursor-pointer text-2xl flex flex-col items-center">
          <UI.Button size="sm" variant="link" onClick={() => handleHours(true)}>
            <Plus />
          </UI.Button>
          <div className="my-1 px-2 py-1 hover:bg-gray-100 rounded">
            {hours < 10 ? '0' + hours.toString() : hours.toString()}
          </div>
          <UI.Button
            size="sm"
            variant="link"
            onClick={() => handleHours(false)}
          >
            <Minus />
          </UI.Button>
        </div>
        <div className="text-2xl -mt-1">:</div>
        <div className="overflow-y-auto cursor-pointer text-2xl flex flex-col items-center">
          <UI.Button
            size="sm"
            variant="link"
            onClick={() => handleMinutes(true)}
          >
            <Plus />
          </UI.Button>
          <div className="my-1 px-2 py-1 hover:bg-gray-100 rounded">
            {minutes < 10 ? '0' + minutes.toString() : minutes.toString()}
          </div>
          <UI.Button
            size="sm"
            variant="link"
            onClick={() => handleMinutes(false)}
          >
            <Minus />
          </UI.Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
